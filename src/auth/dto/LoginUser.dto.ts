import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
        example: 'admin@gmail.com',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @ApiProperty({
        example: 'password',
        required: true
    })
    @MinLength(6)
    @IsString()
    password:string;
}
