import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { creatUserDto } from './dto/creatUser.dto';
import { updateUserDto } from './dto/updatUser.dto';


@Injectable()
export class UserService {
    constructor( public prisma : PrismaService){}

    async create(data : creatUserDto){
        const users = await this.prisma.user.create({
            data:{
                name : data.name,
                email : data.email,
                password : data.password,
            }
        })
        return users;
    };

    async getUsers(){
        const users = await this.prisma.user.findMany();
        return users;
    }

    async getUser(id : number){
        const users = await this.prisma.user.findUnique({
            where:{
                id
            }
        })
        return users;
    }

    async update(data : updateUserDto , id : number){
        const users = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                name : data.name
            }
        });
        return users;
    }
    async delete(id : number){
        await this.prisma.user.delete({
            where:{
                id 
            }
        })
        return 'delete user';
    }
}
