import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipeExists = await this.recipesRepository.findOne({where: {title: createRecipeDto.title}});
    console.log(recipeExists);
    if(recipeExists) {
        throw new HttpException('Recipe already exists', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const newUser = this.recipesRepository.create(createRecipeDto);
    return this.recipesRepository.save(newUser);
  }

  findAll(): Promise<Recipe[]> {
      return this.recipesRepository.find({
        relations: {'user': true}
      });
  }

  async findOne(id: number) {
    const recipeExists = await this.recipesRepository.findOne({where: {id: id}, relations: {'user': true}});
    if(!recipeExists) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return recipeExists;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipeExists = await this.recipesRepository.findOne({where: {id: id}});
    console.log(recipeExists);
    if(!recipeExists) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return this.recipesRepository.update(id, updateRecipeDto);
  }

  async remove(id: number) {
    const recipeExists = await this.recipesRepository.findOne({where: {id: id}}) ;
    console.log(recipeExists);
    if(!recipeExists) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return this.recipesRepository.delete(id);
  }
}
