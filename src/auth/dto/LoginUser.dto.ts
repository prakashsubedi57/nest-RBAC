import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @MinLength(6)
    @IsString()
    password:string;
}
