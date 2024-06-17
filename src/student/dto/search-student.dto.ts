import { IsNotEmpty } from "class-validator";

export class SearchStudentDto {

    name: string;
    contact: string;
    email: string;

    createdAt: 'asc' | 'desc';
    updatedAt: 'asc' | 'desc';

    page: number;
    limit: number;
}
