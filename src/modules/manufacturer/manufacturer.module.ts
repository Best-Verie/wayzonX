import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { Manufacturer } from './manufacturer.entity';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

@Module({
	imports: [
		//TypeOrmModule.forFeature([
		//  Manufacturer
		//])
	],
	controllers: [ManufacturerController],
	providers: [ManufacturerService]
})
export class ManufacturerModule { }
