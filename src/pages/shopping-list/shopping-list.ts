import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { OptionsPage } from './options/options';
import { AuthProvider } from '../../providers/auth/auth';

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
    private shListProvider:ShoppingListProvider,
    private popoverCtrl:PopoverController,
    private authProvider:AuthProvider
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

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(OptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss((action) => {
      if (action === 'load') {
        
      } else {
        this.authProvider.getActiveUser().getIdToken()
          .then( (token: string)=> {
           this.shListProvider.storeList(token)
            .subscribe(
              () => {
                console.log('success');
              },
              (error) => {
                console.error(error);
              }
            ) 
          }
          )
          .catch();
      }
    });
  }

}
