import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { creatUserDto } from './dto/creatUser.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor( public prisma : PrismaService){}

    async createUser(data: creatUserDto){

        const password = await bcrypt.hash(data.password , 15);
        const user = await this.prisma.user.create({
            data:{
                name: data.name,
                email : data.email,
                password : password
            },
            select:{
                name : true,
                email : true
            }
        })
        return user;
    };

    async validateUser(email : string , password : string){
        const user = await this.prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            throw new BadRequestException();
        };
        if(! await bcrypt.compare(password ,user.password)){
            throw new UnauthorizedException()
        };
        return user;
    }

}
