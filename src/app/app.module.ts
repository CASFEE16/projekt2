import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyCNjUMHsV_64Qgh0LM5xUrHf1RMNJ97PGw',
  authDomain: 'hsr-fee16-projekt2.firebaseapp.com',
  databaseURL: 'https://hsr-fee16-projekt2.firebaseio.com',
  storageBucket: 'hsr-fee16-projekt2.appspot.com'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
