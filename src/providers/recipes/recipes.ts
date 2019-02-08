import { Injectable } from '@angular/core';
import { Recipe } from "../../models/recipe.model";

/*
  Generated class for the RecipesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipesProvider {
  private recipes: Recipe[];

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(this.recipes);
    
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index:number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  removeRecipe(index:number) {
    this.recipes.splice(index, 1);
  }

}
