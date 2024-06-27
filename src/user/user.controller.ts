import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { creatUserDto } from './dto/creatUser.dto';
import { updateUserDto } from './dto/updatUser.dto';
import { TransformInterceptor } from './interceptor/transform.interceptor';


@Controller('users')
export class UserController {

    constructor(public userService : UserService){}

    @Get()
    async getUsers(){
        const user = await this.userService.getUsers();
        return user;
    }

    @Get("/:id")
    @UseInterceptors(TransformInterceptor)
    async getUser(@Param("id",ParseIntPipe) id: number){
        const user = await this.userService.getUser(id);
        if(!user){
            throw new NotFoundException('not find users');
        }
        return user;
    }

    @Post()
    async createUser(@Body() body:creatUserDto){
        const user = await this.userService.create(body);
        return user;
    }

    @Put("/:id")
    async updatUser(@Body() body : updateUserDto , @Param("id",ParseIntPipe) id:number){
        const user = await this.userService.update(body , id);
        return user;
    }

    @Delete("/:id")
    async deleteUser(@Param("id",ParseIntPipe) id:number){
        const user = await this.userService.delete(id);
        return user;
    }
}
