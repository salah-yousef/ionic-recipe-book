import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { RecipesPageModule } from '../pages/recipes/recipes.module';
import { ShoppingListProvider } from '../providers/shopping-list/shopping-list';
import { RecipeFormPageModule } from '../pages/recipe-form/recipe-form.module';
import { RecipesProvider } from '../providers/recipes/recipes';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    TabsPageModule,
    ShoppingListPageModule,
    RecipesPageModule,
    RecipeFormPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListProvider,
    RecipesProvider
  ]
})
export class AppModule {}
