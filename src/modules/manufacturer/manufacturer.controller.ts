import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateManufacturerDTO } from './dto/createManufacturer.dto';
import { RegisterManufacturerDTO } from './dto/registerManufacturer.dto';
import { VerifyManufacturerDTO } from './dto/verifyManufacturer.dto';
import { ManufacturerService } from './manufacturer.service';

@ApiTags('manufacturer')
@Controller('/api/manufacturer')
export class ManufacturerController {
	constructor(private readonly manufacturerService: ManufacturerService) { }

	@Get()
	async getManufacturers() {
		return await this.manufacturerService.getManufacturers();
	}

	@Get('/:id')
	async getManufacturerById(@Param('id') id: string) {
		return await this.manufacturerService.getManufacturerById(id);
	}

	//@Post('/register')
	//async registerManufacturer(@Body() createManufacturerDTO: createManufacturerDTO) { }

	@Post('/register')
	async registerManufacturer(
		@Body() manufacturerData: RegisterManufacturerDTO,
	) {
		return await this.manufacturerService.registerManufacturer(
			manufacturerData,
		);
	}

	@Post('/verify')
	async verifyManufacturer(@Body() verifyManufacturer: VerifyManufacturerDTO) {
		return await this.manufacturerService.verifyManufacturer(verifyManufacturer);
	}

	@Post('/complete-profile')
	async comple(@Body() manufactureProfile: CreateManufacturerDTO) {
		return await this.manufacturerService.createManufactureProfile(manufactureProfile);
	}



	@Patch(':id')
	async updateManufacturer(@Param('id') id: string) { }

	@Delete(':id')
	async deleteManufacturer(@Param('id') id: string) { }
}
