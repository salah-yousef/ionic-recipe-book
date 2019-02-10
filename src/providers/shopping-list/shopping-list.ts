import { Injectable } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { AuthProvider } from '../auth/auth';
/*
  Generated class for the ShoppingListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingListProvider {
  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private authProvider: AuthProvider) {
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

  storeList(token: string) {
    const userId = this.authProvider.getActiveUser().uid;
    return this.http.put(`https://ionic3-recipe-book-87e6d.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.ingredients);
  }

}
