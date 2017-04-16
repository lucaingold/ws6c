import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { IdeasPage } from '../pages/ideas/ideas';
import { TabsPage } from '../pages/tabs/tabs';

import { CreateCategoryPage } from '../pages/create/category/category';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBaVs3ekmQfic76YVMyk94S5Q6u78jVjeI",
    authDomain: "lifeplanner-fde5e.firebaseapp.com",
    databaseURL: "https://lifeplanner-fde5e.firebaseio.com",
    projectId: "lifeplanner-fde5e",
    storageBucket: "lifeplanner-fde5e.appspot.com",
    messagingSenderId: "443746954353"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    IdeasPage,
    TabsPage,
    CreateCategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    IdeasPage,
    TabsPage,
    CreateCategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }