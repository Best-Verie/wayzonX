import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class createManufacturerDTO{
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    adminEmail: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    companyName: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    tinNumber: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    streetAddress: string;

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
    companyWebsite: string;
    

}