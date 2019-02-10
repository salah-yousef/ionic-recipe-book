import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider:AuthProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form: NgForm) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });  
    loader.present();


    this.authProvider.signIn(form.value.email, form.value.password)
      .then(data => {
        loader.dismiss();
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: error.message,
          duration: 5000
        });
        toast.present();
        loader.dismiss();
      });
  }

}
