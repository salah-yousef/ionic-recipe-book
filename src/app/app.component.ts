import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from "firebase";
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild('nav') nav: NavController;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuthenticated: boolean = false;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authProvider:AuthProvider) {

      firebase.initializeApp({
        apiKey: "AIzaSyAIdc-xxfTr6EwNr6_iiwBZtSd_Yp__wXI",
        authDomain: "ionic3-recipe-book-87e6d.firebaseapp.com"
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.nav.setRoot(this.rootPage);
        } else {
          this.isAuthenticated = false;
          this.nav.setRoot(this.signinPage);
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.closeMenu();
  }
  onLogOut() {
    this.authProvider.signOut();
    this.closeMenu();
  }
  closeMenu() {
    this.menuCtrl.close();
  }
}

