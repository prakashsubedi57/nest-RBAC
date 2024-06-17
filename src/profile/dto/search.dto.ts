import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, isString } from "class-validator";

export class SearchProfileDto {

    @ApiProperty({
        example: 'ASC',
    })
    @IsOptional()
    created_order: 'ASC' | 'DESC';


    @ApiProperty({
        example: 'DESC',
    })
    @IsOptional()
    updated_order: 'ASC' | 'DESC';

    @ApiProperty({
        example: 'DESC',
    })
    @IsOptional()
    dob_order: 'ASC' | 'DESC';

    @ApiProperty({
        example: 'admin',
    })
    @IsOptional()
    @IsString()
    title: string;
}
