import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    link: string;

    @IsNotEmpty()
    description: string;

    urlPhoto: string

    @IsNotEmpty()
    userId: number;
}
