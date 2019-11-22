import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ReputationPage } from '../pages/reputation/reputation';
import { AddQualifyPage } from '../pages/addQualify/addQualify';
import { UserPage, ModalDomicilio , ModalUsuario, ModalTelefono} from '../pages/user/user';
import { AltaServicePage } from '../pages/alta-service/alta-service';
import { HerramientaPage } from '../pages/herramienta/herramienta';
import { ModalContactoPage } from '../pages/modal-contacto/modal-contacto';


import { ResultadosPage } from '../pages/resultados/resultados';
import { OrderModule } from 'ngx-order-pipe';
import { MyFilterPipe } from './order.pipe';

import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { Config } from '../config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthenticatorService } from '../providers/authenticatorService';
import { UtilService } from  '../providers/utilService';
import { StarRatingModule } from 'ionic3-star-rating';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultadosPage,
    LoginPage,
    MyFilterPipe,
    UserPage,
    ModalDomicilio,
    ModalTelefono,
    ModalUsuario,
    AltaServicePage,
    ReputationPage,
    AddQualifyPage,
    HerramientaPage,
    ModalContactoPage
  ],
  imports: [
    BrowserModule,
    OrderModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Config.FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultadosPage,
    LoginPage,
    ModalDomicilio,
    ModalTelefono,
    ModalUsuario,
    UserPage,
    AltaServicePage,
    ReputationPage,
    AddQualifyPage,
    HerramientaPage,
    ModalContactoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    AngularFireAuth,
    AuthenticatorService,
    UtilService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [MyFilterPipe]
})
export class AppModule {}
