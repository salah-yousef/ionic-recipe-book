import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { RecipeFormPage } from '../recipe-form/recipe-form';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { RecipesProvider } from '../../providers/recipes/recipes';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe: Recipe;
  index: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private shoppingListProvider:ShoppingListProvider,
    private recipesProvider:RecipesProvider) {
  }

  ionViewWillEnter() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');    
  }

  onEditRecipe() {
    this.navCtrl.push(RecipeFormPage, {mode: 'edit', recipe: this.recipe, index: this.index});
  }

  onAddIngredients() {
    this.shoppingListProvider.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesProvider.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
