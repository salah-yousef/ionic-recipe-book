import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
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
    private shListProvider: ShoppingListProvider,
    private popoverCtrl: PopoverController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
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
    console.log(this.ingredients);
    this.ingredients = this.shListProvider.getIngredients();
  }

  onShowOptions(event: MouseEvent) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });  
    
    const popover = this.popoverCtrl.create(OptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss((action) => {
      if (action === 'fetch') {
        loader.present();
        this.authProvider.getActiveUser().getIdToken()
          .then((token: string)=> {
            this.shListProvider.fetchList(token)
            .subscribe(
              (ingredients: Ingredient[]) => {
                loader.dismiss();
                if (ingredients) {
                  this.teastMessage("Loaded successfuly");
                   this.shListProvider.addIngredients(ingredients);
                   this.ingredients = this.shListProvider.getIngredients();
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
           this.shListProvider.storeList(token)
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
