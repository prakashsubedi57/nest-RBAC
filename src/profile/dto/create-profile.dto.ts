import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    bio: string;

    @IsNotEmpty()
    address: string;

    @IsDate()
    @Type(() => Date)
    dob: Date;
}
