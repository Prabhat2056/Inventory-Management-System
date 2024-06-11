import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(//dependency injection
    private readonly prismaService: PrismaService,
  ){}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity>{//async ko case ma promise return garnu parxa
    //check if role  already exists
    //if exists throw error Role <name> already exists.
    // if not continue with the request
    
    const roleExits = await this.checkIfRoleExistsByName(createRoleDto.name);
    

    if (roleExits){
      throw new BadRequestException(`Role ${createRoleDto.name} already exists`);
    }
    return this.prismaService.role.create({
      data: createRoleDto,
    });
  }

  async findAll(): Promise<RoleEntity[]> {//[]
    //@todo: To add Pagiantion
    return this.prismaService.role.findMany();
  }

  async findOne(id: number): Promise<RoleEntity> {
    return this.checkIfRoleExists(id);

    
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.checkIfRoleExists(id);

    const roleExists = await this.checkIfRoleExistsByName(updateRoleDto.name, id);

    if (!roleExists) {
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
    await this.checkIfRoleExists(id);
    return this.prismaService.role.delete({ where: {id}});
  }

  private async checkIfRoleExists(id: number): Promise<RoleEntity>{
    const role = await this.prismaService.role
      .findFirst({ where: {id}});

    if (!role){
      throw new NotFoundException();
    }
    return role;

  }

  private async checkIfRoleExistsByName(name: string, id?: number): Promise<boolean>{
    const checkRoleExists = await this.prismaService.role
    .findUnique({ where: {name}});

    if (id) {
      return checkRoleExists ? checkRoleExists.id === id : true;
    }
    return !!checkRoleExists;
  }
}
