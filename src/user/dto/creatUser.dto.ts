import { IsEmail, IsString,Length } from "class-validator"

export class creatUserDto{
    @IsString()
    name:string

    @IsEmail()
    email : string
    
    @IsString()
    @Length(5,20)
    password : string
}