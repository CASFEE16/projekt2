import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';

import {RouterModule} from '@angular/router';
import {ROUTE_CONFIG} from './route-config';

import {AppComponent} from './app.component';
import {UserModule} from './user/user.module';
import {CoreModule} from './core/core.module';
import {LayoutComponent} from './shared/material/layout/layout.component';
import {FrontModule} from './front/front.module';

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyCNjUMHsV_64Qgh0LM5xUrHf1RMNJ97PGw',
  authDomain: 'hsr-fee16-projekt2.firebaseapp.com',
  databaseURL: 'https://hsr-fee16-projekt2.firebaseio.com',
  storageBucket: 'hsr-fee16-projekt2.appspot.com'
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(ROUTE_CONFIG),
    CoreModule,
    UserModule,
    FrontModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
