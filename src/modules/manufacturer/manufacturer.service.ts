import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { createManufacturerDTO } from './dto/createManufacturer.dto';
import { PrismaService } from 'src/services/prisma.service';
const { hashPassword } = require('../../Utils/hashes/password.hash');

@Injectable()
export class ManufacturerService {
	constructor(
		private prismaService: PrismaService
	) { }

	async getManufacturers() {
		return await this.prismaService.manufacturer.findMany()
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
