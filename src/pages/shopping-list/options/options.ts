import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl:ViewController
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  onAction(action: string) {
    this.viewCtrl.dismiss(action);
  }

}
