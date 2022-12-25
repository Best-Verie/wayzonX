import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma.service';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET,
				signOptions: { expiresIn: process.env.EXPIRES_IN },
			})
		})
	],
	controllers: [ManufacturerController],
	providers: [ManufacturerService, PrismaService],
})
export class ManufacturerModule { }
