import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(
    private viewCtrl:ViewController
    ) { }


  onAction(action: string) {
    this.viewCtrl.dismiss(action);
  }

}
