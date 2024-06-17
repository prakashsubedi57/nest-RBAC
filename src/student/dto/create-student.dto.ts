import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({
        example: 'Ram',
        required: true
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'ram@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '9800000000',
    })
    @IsNotEmpty()
    contact: string;
}
