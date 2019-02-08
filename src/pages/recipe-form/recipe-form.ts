import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesProvider } from '../../providers/recipes/recipes';
import { Recipe } from '../../models/recipe.model';

@IonicPage()
@Component({
  selector: 'page-recipe-form',
  templateUrl: 'recipe-form.html',
})
export class RecipeFormPage implements OnInit{
  mode: string = 'new';
  options: string[] = ['Easy', 'Meduim', 'Hard'];
  recipeForm: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private toastCtrl:ToastController,
    private recipesProvider:RecipesProvider) {
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  ionViewWillEnter() {
    this.mode = this.navParams.data.mode;
  }

  onSubmit() {
    const formValue: Recipe = this.recipeForm.value;
    let ingredients = [];
    if (formValue.ingredients.length > 0) {
      ingredients = formValue.ingredients.map(name => {
        return {name: name, amout: 1};
      });
    }
    formValue.ingredients = ingredients;
    this.recipesProvider.addRecipe(formValue);

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do ?',
      buttons: [
        {
          text: 'Delete all Ingredients',
          role: 'destructive',
          icon: this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            if (fArray.length > 0) {
              while (fArray.length !== 0) {
                fArray.removeAt(0);
              }
              const toast = this.toastCtrl.create({
                message: 'Done!',
                duration: 2000,
                position: 'bottom',
              });
              toast.present();
            }
          }
        }, 
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createAlert().present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  private createAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      message: "Enter a name for this new Ingredient",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please Enter a Valid Values',
                duration: 3000,
                position: 'bottom',
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item Added!',
              duration: 3000,
              position: 'bottom',
            });
            toast.present();
          }
        }
      ]
    });
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl(this.options[1], Validators.required),
      ingredients: new FormArray([])
    });
  }

}
