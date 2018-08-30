import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { FeedPage } from '../pages/feed/feed';
var config = {
  apiKey: "AIzaSyB9eiuN5GwxRpiceU_2X9U_D2kXRvzHccw",
  authDomain: "cloudfunction-9d075.firebaseapp.com",
  databaseURL: "https://cloudfunction-9d075.firebaseio.com",
  projectId: "cloudfunction-9d075",
  storageBucket: "cloudfunction-9d075.appspot.com",
  messagingSenderId: "351452593314"
};
firebase.initializeApp(config)
firebase.firestore().settings({
  timestampsInSnapshots: true
})
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
