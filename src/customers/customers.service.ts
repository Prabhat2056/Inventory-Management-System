import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService,) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const checkCustomerExists= await this.checkIfCustomerExistsByEmail(createCustomerDto.email);

    if (checkCustomerExists){
      throw new BadRequestException(`Customer ${createCustomerDto.name} already exists`)
    }

    return this.prismaService.customerVendor.create({
      data: createCustomerDto,
    });
  }

  async findAll() {
    return this.prismaService.customerVendor.findMany();
  }

  async findOne(id: number) {
    return this.checkIfCustomerExists(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.checkIfCustomerExists(id);
    const checkIfCustomerExists = await this.checkIfCustomerExistsByEmail(updateCustomerDto.email, id);//only in case of unique field

    if(checkIfCustomerExists) {
      throw new BadRequestException(`Customer ${updateCustomerDto.email} already exists.`)
    }

    return this.prismaService.customerVendor
      .update({
        where: {
          id,
        },
        data: updateCustomerDto,
      });
  }

  async remove(id: number) {
    await this.checkIfCustomerExists(id);
    return this.prismaService.customerVendor.delete({ where: {id}});
  }

  private async checkIfCustomerExists(id: number) {
    const customer = await this.prismaService.customerVendor
      .findFirst({ where: {id}});

    if (!customer){
      throw new NotFoundException();
    }
  
    return customer;
  }

//only in case of unique field
  private async checkIfCustomerExistsByEmail(email: string, id?: number): Promise<boolean>{
    const checkCustomerExists = await this.prismaService.customerVendor
      .findFirst({ where:  { email }});

    if (id) {
      return checkCustomerExists ? checkCustomerExists.id === id : true;
    }
    return !!checkCustomerExists;
  }
}
