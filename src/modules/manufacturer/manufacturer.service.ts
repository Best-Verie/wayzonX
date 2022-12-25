import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { generateCode } from 'src/Utils/generate';
import { CreateManufacturerDTO } from './dto/createManufacturer.dto';
import { RegisterManufacturerDTO } from './dto/registerManufacturer.dto';
import { VerifyManufacturerDTO } from './dto/verifyManufacturer.dto';
import * as bcrypt from 'bcrypt';
import { ManufacturerSigninDTO } from './dto/manufacturerSignin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManufacturerService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService,
	) { }

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

		if (!manufacturer.verified) {
			throw new BadRequestException('Manufacturer not verified');
		}

		if (manufactureProfile.password === manufactureProfile.confirmPassword)
			manufactureProfile.password = await bcrypt.hash(
				manufactureProfile.password,
				10,
			);
		else
			throw new BadRequestException(
				'Password and confirm password do not match',
			);

		delete manufactureProfile.confirmPassword;

		await this.prismaService.manufacturer.update({
			where: {
				email: manufactureProfile.email,
			},
			data: {
				...manufactureProfile,
			},
		});

		return {
			message: 'Manufacturer profile created successfully',
		};
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

		// check if verification code is not expired
		const verificationCodeExpired =
			manufacturer.verificationCodeExpiry < new Date();

		if (verificationCodeExpired) {
			throw new BadRequestException('Verification code expired');
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
				// reset verification code and expiry
				verificationCodeExpiry: null,
				verificationCode: null,
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
				// make code expire after 15 minutes
				verificationCodeExpiry: new Date(new Date().getTime() + 15 * 60 * 1000),
			},
		});

		return {
			message: 'Manufacturer created',
		};
	}

	async deleteManufacturer(id: string) {
		const manufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				id,
			},
		});

		if (!manufacturer) {
			throw new BadRequestException('Manufacturer not found');
		}

		await this.prismaService.manufacturer.delete({
			where: {
				id,
			},
		});
	}

	async updateManufacturer(
		id: string,
		manufactureProfile: CreateManufacturerDTO,
	) {
		const manufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				id,
			},
		});

		if (!manufacturer) {
			throw new BadRequestException('Manufacturer not found');
		}

		if (manufactureProfile.password) {
			manufactureProfile.password = await bcrypt.hash(
				manufactureProfile.password,
				10,
			);
		}

		await this.prismaService.manufacturer.update({
			where: {
				id,
			},
			data: {
				...manufactureProfile,
			},
		});
	}

	async signIn(manufacturerSigninDTO: ManufacturerSigninDTO) {
		const manufacturer = await this.prismaService.manufacturer.findUnique({
			where: {
				email: manufacturerSigninDTO.email,
			},
		});

		if (!manufacturer) {
			throw new BadRequestException('Manufacturer not found');
		}

		if (!manufacturer.verified) {
			throw new BadRequestException('Manufacturer not verified');
		}

		const passwordMatch = await bcrypt.compare(
			manufacturerSigninDTO.password,
			manufacturer.password,
		);

		if (!passwordMatch) {
			throw new BadRequestException('Invalid password');
		}

		const token = this.jwtService.sign({ id: manufacturer.id });

		return {
			token,
			manufacturer,
		};
	}
}
