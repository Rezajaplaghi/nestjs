import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { creatUserDto } from './dto/creatUser.dto';
import { loginUserDto } from './dto/login.dto';
import { localAuthGuard } from './local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(public authServuce : AuthService , public jwtService : JwtService){}

    @Post("/regester")
    async createUser (@Body() body:creatUserDto){
        const user = await this.authServuce.createUser(body);
        return user;
    }

    @Post("/login")
    @UseGuards(localAuthGuard)
    async login(@Body() body:loginUserDto , @Request() req){
         
        return {
            token: this.jwtService.sign({
                id : req.user.id,
                email : req.user.email
            })
        };
    }

    @UseGuards(jwtAuthGuard)
    @Get('/profile')
    profile(@Request() req){
        return req.user;
    }
}
