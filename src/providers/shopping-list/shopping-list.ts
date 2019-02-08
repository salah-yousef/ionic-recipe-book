import { Injectable } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";

/*
  Generated class for the ShoppingListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingListProvider {
  private ingredients: Ingredient[] = [];

  constructor() {
    console.log('Hello ShoppingListProvider Provider');
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.unshift(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.unshift(...ingredients);
  }

  getIngredients() :Ingredient[] {
    return this.ingredients.slice();
  }

  removeIngredient(i: number) {
    this.ingredients.splice(i, 1);
  }
}
