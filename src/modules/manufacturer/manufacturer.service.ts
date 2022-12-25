import { BadRequestException, Injectable } from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
//import { Manufacturer } from './manufacturer.entity';
//import { createManufacturerDTO } from './dto/createManufacturer.dto';
import { PrismaService } from 'src/services/prisma.service';
import { generateCode } from 'src/Utils/generate';
import { CreateManufacturerDTO } from './dto/createManufacturer.dto';
import { RegisterManufacturerDTO } from './dto/registerManufacturer.dto';
import { VerifyManufacturerDTO } from './dto/verifyManufacturer.dto';
//import { hashPassword } from '../../Utils/hashes/password.hash';

@Injectable()
export class ManufacturerService {

	constructor(private prismaService: PrismaService) { }

	async getManufacturers() {
		return await this.prismaService.manufacturer.findMany();
	}

	async createManufactureProfile(manufactureProfile: CreateManufacturerDTO) {
		const manufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				email: manufactureProfile.email,
			},
		});

		if (!manufacturer) {
			throw new BadRequestException('Manufacturer not found');
		}


	}

	async verifyManufacturer(verifyManufacturer: VerifyManufacturerDTO) {
		const manufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				email: verifyManufacturer.email,
			},
		});

		if (!manufacturer) {
			throw new BadRequestException('Manufacturer not found');
		}

		if (manufacturer.verified) {
			throw new BadRequestException('Manufacturer already verified');
		}

		if (manufacturer.verificationCode !== verifyManufacturer.code) {
			throw new BadRequestException('Invalid verification code');
		}

		await this.prismaService.manufacturer.update({
			where: {
				id: manufacturer.id,
			},
			data: {
				verified: true,
			},
		});

		return {
			message: 'Manufacturer verified',
		};
	}

	async getManufacturerById(id: string) {
		if (!id) {
			throw new BadRequestException('No id provided');
		}

		const manufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				id,
			},
		});

		if (!manufacturer) {
			throw new BadRequestException('No manufacturer found');
		}

		return manufacturer;
	}

	async registerManufacturer(manufacturerData: RegisterManufacturerDTO) {
		const ceckManufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				email: manufacturerData.email,
			},
		});

		if (ceckManufacturer) {
			throw new BadRequestException('Manufacturer already exists');
		}

		const verificationCode = generateCode(7);

		// TODO: Send verification code to email
		console.log({ verificationCode });

		await this.prismaService.manufacturer.create({
			data: {
				...manufacturerData,
				verificationCode,
			},
		});

		return {
			message: 'Manufacturer created',
		};
	}

	//async findManufactureByEmail(email: string): Promise<Boolean> {
	//	const admin = await this.manufacturerRepository.findOne({
	//		where: { adminEmail: email },
	//	});

	//	console.log("reacheeeeeeeedd");

	//	if (admin) {
	//		return true;
	//	} else {
	//		return false;
	//	}
	//}

	//async registerCompany(manufacturerData: createManufacturerDTO) {
	//	try {
	//		const companyExists = await this.findManufactureByEmail(manufacturerData.adminEmail);
	//		console.log("reached here!");
	//		if (companyExists) {
	//			throw new NotAcceptableException('companyExists already exists');
	//		}
	//		if (manufacturerData.password === manufacturerData.confirmPassword) {
	//			manufacturerData.password = await hashPassword(
	//				manufacturerData.password,
	//			);
	//		} else {
	//			throw new NotAcceptableException('Passwords should match');
	//		}
	//		const newAdmin = await this.manufacturerRepository.save(manufacturerData);
	//		return newAdmin;
	//	} catch (error) {
	//		throw new BadRequestException(error.message);
	//	}
	//}
}
