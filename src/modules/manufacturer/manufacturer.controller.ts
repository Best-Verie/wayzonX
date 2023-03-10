import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import {
    ApiTags
} from '@nestjs/swagger';
import { createManufacturerDTO } from './dto/createManufacturer.dto';
import {
    ManufacturerService
} from './manufacturer.service';

@Controller('manufacturer')
@ApiTags('manufacturer')
export class ManufacturerController {
    constructor(private readonly manufacturerService: ManufacturerService ) {}

    @Post('createCompany')
    private async registerCompany(@Body() manufacturerData: createManufacturerDTO) {
        console.log("hey there!")
        console.log(__dirname);
        return this.manufacturerService.registerCompany(manufacturerData);
    }
}