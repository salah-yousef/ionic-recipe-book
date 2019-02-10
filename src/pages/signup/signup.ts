import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider:AuthProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });  

    loader.present();

    this.authProvider.signUp(form.value.email, form.value.password)
      .then(data => {
        const toast = this.toastCtrl.create({
          message: 'You can sign in now',
          duration: 5000
        });

        loader.dismiss();
        toast.present();
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: error.message,
          duration: 5000
        });
        
        loader.dismiss();
        toast.present();
      });
  }

}
