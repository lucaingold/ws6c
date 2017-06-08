import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SuggestionPage } from '../pages/suggestions/suggestions';
import { ProgressPage } from '../pages/progress/progress';
import { HomePage } from '../pages/home/home';
import { IdeasPage } from '../pages/ideas/ideas';
import { TabsPage } from '../pages/tabs/tabs';

import { CreateCategoryPage } from '../pages/create/category/category';
import { CreateIdeaPage } from '../pages/create/idea/idea';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

import { Camera } from '@ionic-native/camera';

import { Ionic2RatingModule } from 'ionic2-rating';

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
    SuggestionPage,
    ProgressPage,
    HomePage,
    IdeasPage,
    TabsPage,
    CreateCategoryPage,
    CreateIdeaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SuggestionPage,
    ProgressPage,
    HomePage,
    IdeasPage,
    TabsPage,
    CreateCategoryPage,
    CreateIdeaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera
  ]
})
export class AppModule { }
