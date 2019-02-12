import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { RecipeFormPage } from '../recipe-form/recipe-form';
import { Recipe } from '../../models/recipe.model';
import { RecipesProvider } from '../../providers/recipes/recipes';
import { RecipePage } from '../recipe/recipe';
import { RecipesOptionsPage } from "../recipes/recipes-options/recipes-options";
import { AuthProvider } from '../../providers/auth/auth';

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
    private recipesProvider:RecipesProvider,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController
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

  onShowOptions(event: MouseEvent) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });  
    
    const popover = this.popoverCtrl.create(RecipesOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss((action) => {
      if (action === 'fetch') {
        loader.present();
        this.authProvider.getActiveUser().getIdToken()
          .then((token: string)=> {
            this.recipesProvider.fetchRecipes(token)
            .subscribe(
              (recipes: Recipe[]) => {
                loader.dismiss();
                if (recipes) {
                  this.teastMessage("Loaded successfuly");
                   this.recipesProvider.addRecipes(recipes);
                   this.recipes = this.recipesProvider.getRecipes();
                   for (const recipe of this.recipes) {
                    if (!recipe.ingredients) {
                      recipe.ingredients = [];
                    }
                   }
                 }
               },
               (error) => {
                loader.dismiss();
                this.teastMessage(error.message);            
               }
             ) 
           })
           .catch((error) => {
            loader.dismiss();
            this.teastMessage(error.message);
          });
      } else if (action === 'store'){
        loader.present();
        this.authProvider.getActiveUser().getIdToken()
          .then( (token: string)=> {
           this.recipesProvider.storeRecipes(token)
            .subscribe(
              () => {
                loader.dismiss();
                this.teastMessage("Stored successfuly");
              },
              (error) => {
                loader.dismiss();
                this.teastMessage(error.message);
              }
            );
          }
          )
          .catch((error) => {
            loader.dismiss();
            this.teastMessage(error.message);
          });
      }
    });
  }

  private teastMessage(teastMessage: string) {
    const toast = this.toastCtrl.create({
      message: teastMessage,
      duration: 5000
    });
    toast.present();            
  }

}
