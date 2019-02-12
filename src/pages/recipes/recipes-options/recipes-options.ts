import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the RecipesOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes-options',
  templateUrl: 'recipes-options.html',
})
export class RecipesOptionsPage {

  constructor(private viewCtrl:ViewController) {}

  onAction(action: string) {
    this.viewCtrl.dismiss(action);
  }


}
