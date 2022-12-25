import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateManufacturerDTO {
	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	name: string;


	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	adress: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	phoneNumber: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	confirmPassword: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	website: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	country: string;


	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	state: string;
}
