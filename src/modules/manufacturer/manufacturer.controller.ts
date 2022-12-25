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
import { ManufacturerSigninDTO } from './dto/manufacturerSignin.dto';
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
		return await this.manufacturerService.verifyManufacturer(
			verifyManufacturer,
		);
	}

	@Post('/complete-profile')
	async comple(@Body() manufactureProfile: CreateManufacturerDTO) {
		return await this.manufacturerService.createManufactureProfile(
			manufactureProfile,
		);
	}

	@Patch(':id')
	async updateManufacturer(
		@Param('id') id: string,
		@Body() manufactureProfile: CreateManufacturerDTO,
	) {
		return await this.manufacturerService.updateManufacturer(
			id,
			manufactureProfile,
		);
	}

	@Delete(':id')
	async deleteManufacturer(@Param('id') id: string) {
		return await this.manufacturerService.deleteManufacturer(id);
	}

	@Post('/signin')
	async signIn(@Body() manufacturerSigninDTO: ManufacturerSigninDTO) {
		return await this.manufacturerService.signIn(manufacturerSigninDTO);
	}
}
