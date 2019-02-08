import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private shListProvider:ShoppingListProvider
    ) {
  }

  ionViewWillEnter() {
    this.ingredients = this.shListProvider.getIngredients();
  }

  onSubmit({form}) {    
    if(form.valid){
      this.shListProvider.addIngredient(form.value);
      this.ingredients = this.shListProvider.getIngredients();
      form.reset();
    }
  }

  onDelete(index: number) {
    this.shListProvider.removeIngredient(index);
    this.ingredients = this.shListProvider.getIngredients();
  }

}
