import { Injectable } from '@angular/core';
import { Recipe } from "../../models/recipe.model";
import { AuthProvider } from "../auth/auth";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RecipesProvider {
  recipes: Recipe[] = [];

  constructor(private authProvider: AuthProvider, private http: HttpClient) {

  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  addRecipes(recipes: Recipe[]) {
    this.recipes.push(...recipes);    
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

  storeRecipes(token: string) {
    const userId = this.authProvider.getActiveUser().uid;
    return this.http.put(`https://ionic3-recipe-book-87e6d.firebaseio.com/${userId}/Recipe.json?auth=${token}`, this.recipes);
  }

  fetchRecipes(token: string) {
    const userId = this.authProvider.getActiveUser().uid;
    return this.http.get(`https://ionic3-recipe-book-87e6d.firebaseio.com/${userId}/Recipe.json?auth=${token}`);
  }

}
