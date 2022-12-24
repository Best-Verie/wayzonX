import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { createManufacturerDTO } from './dto/createManufacturer.dto';
const { hashPassword } = require('../../Utils/hashes/password.hash');

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

    async findManufactureByEmail(email: string): Promise<Boolean>{
        console.log("reacheeeeeeeedd here");

        const admin = await this.manufacturerRepository.findOne({
          where: { adminEmail: email },
        });

        console.log("reacheeeeeeeedd");

        if (admin) {
          return true;
        } else {
          return false;
        }
    }
 
  async registerCompany(manufacturerData: createManufacturerDTO) {
    try {
      console.log("Hellooooooooooooooooo");
      const companyExists = await this.findManufactureByEmail(manufacturerData.adminEmail);
      console.log("reached here!");
      if (companyExists) {
        throw new NotAcceptableException('companyExists already exists');
      }
      if (manufacturerData.password === manufacturerData.confirmPassword) {
        manufacturerData.password = await hashPassword(
          manufacturerData.password,
        );
      } else {
        throw new NotAcceptableException('Passwords should match');
      }

      console.log("About to end")
      const newAdmin = await this.manufacturerRepository.save(manufacturerData);
      return newAdmin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
