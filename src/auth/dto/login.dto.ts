import { IsEmail, IsString,Length } from "class-validator"

export class loginUserDto{
    @IsEmail()
    email : string
    
    @IsString()
    @Length(5,20)
    password : string
}