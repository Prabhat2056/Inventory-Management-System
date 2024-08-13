import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const checkItemExists = await this.prismaService.item
    .findUnique({ where: { name: createItemDto.name}})

    if (checkItemExists){
      throw new BadRequestException(`Item ${createItemDto.name} already exists`);
    }
    return this.prismaService.item.create({
      data: createItemDto,
    });
    
  }

  async findAll(){//[]
    //@todo: To add Pagiantion
    return this.prismaService.item.findMany();
  }

  async findOne(id: number) {
    return this.checkIfItemExists(id);

    
  }

  async update(id: number, updateRoleDto: UpdateItemDto) {
    await this.checkIfItemExists(id);

    const roleExists = await this.checkIfItemExistsByName(updateRoleDto.name, id);

    if (!this.checkIfItemExists) {
      throw new BadRequestException(`Role ${updateRoleDto.name} already exits.`)
    }

    return this.prismaService.role
    .update({
      where: {
        id,
      },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    await this.checkIfItemExists(id);
    return this.prismaService.item.delete({ where: {id}});
  }

  private async checkIfItemExists(id: number){
    const role = await this.prismaService.item
      .findFirst({ where: {id}});

    if (!Item){
      throw new NotFoundException();
    }
    return Item;

  }

  private async checkIfItemExistsByName(name: string, id?: number): Promise<boolean>{
    const checkItemExists = await this.prismaService.item
    .findUnique({ where: {name}});

    if (id) {
      return checkItemExists ? checkItemExists.id === id : true;
    }
    return !!checkItemExists;
  }
}
