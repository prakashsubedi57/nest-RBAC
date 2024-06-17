import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    contact: string;
}
