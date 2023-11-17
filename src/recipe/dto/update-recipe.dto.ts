import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsNotEmpty } from 'class-validator';


export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    link: string;

    @IsNotEmpty()
    description: string;
}
