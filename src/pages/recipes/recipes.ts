import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeFormPage } from '../recipe-form/recipe-form';
import { Recipe } from '../../models/recipe.model';
import { RecipesProvider } from '../../providers/recipes/recipes';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private recipesProvider:RecipesProvider
    ) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipesProvider.getRecipes();    
  }

  onNewRecipe() {
    this.navCtrl.push(RecipeFormPage, {mode: 'new'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index:index});
  }

}
