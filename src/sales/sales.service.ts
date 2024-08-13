import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    const customer = await this.prismaService.customerVendor
      .findFirst({ where: { id: createSaleDto.customer_id } });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customer.id} does not exits`);
    }

    await Promise.all(createSaleDto.items.map(async (item) => {
      const itemQuery = await this.prismaService.item.findFirst({ where: { id: item.item_id } });

      if (!itemQuery) {
        throw new NotFoundException(`Item with id ${item.item_id} does not exist`);
      }

      item.sub_total = item.price - (item.price * item.discount/100);
      item.sub_total += (item.price * item.tax/100);
    }));

    return this.prismaService.sale.create({
      data: {
        customer_id: createSaleDto.customer_id,
        order_date: createSaleDto.order_date,
        items: {
          createMany: {
            data: createSaleDto.items,
          }
        }
      }
    });
  }

  
  async findAll() {
    return this.prismaService.sale.findMany({
      include: {
        items: true,
      }
    });
  }

  async findOne(id: number) {
    return this.checkIfSaleExists(id);
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    await this.checkIfSaleExists(id);

    const customer = await this.prismaService.customerVendor
      .findFirst({ where: {id: updateSaleDto.customer_id}});

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customer.id} doesn't exists`);
    }

    await Promise.all(updateSaleDto.items.map(async (item)=> {
      const itemQuery = await this.prismaService.item.findFirst({ where: { id: item.item_id}});

      if (!itemQuery) {
        throw new NotFoundException(`Item with id ${item.item_id} does not exist`);
      }

      item.sub_total = item.price - (item.price * item.discount/100);
      item.sub_total += (item.price * item.tax/100);
    }));

    //update garne method different xa
  }

  async remove(id: number) {
    await this.checkIfSaleExists(id);
    return this.prismaService.customerVendor.delete({ where: {id}});
  }

  private async checkIfSaleExists(id: number) {
    const sale = await this.prismaService.sale
      .findFirst({ where: {id}, include: { items: true }});

    if (!sale){
      throw new NotFoundException();
    }
  
    return sale;
  }
  
  
}
