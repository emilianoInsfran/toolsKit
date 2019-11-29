import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlquilerClienteTabsPage } from '../pages/alquilerClienteTabs/alquilerClienteTabs';
import { AlquilerProveedorTabsPage } from '../pages/alquilerProveedorTabs/alquilerProveedorTabs';
import { AddQualifyPage } from '../pages/addQualify/addQualify';
import { UserPage, ModalDomicilio , ModalUsuario, ModalTelefono} from '../pages/user/user';
import { AltaServicePage } from '../pages/alta-service/alta-service';
import { HerramientaPage } from '../pages/herramienta/herramienta';
import { ModalContactoPage } from '../pages/modal-contacto/modal-contacto';
import { EditServicePage } from '../pages/edit-service/edit-service';

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

import { PendienteClientePage } from '../pages/alquilerClienteTabs/pendiente/pendienteCliente';
import { EnCursoClientePage } from '../pages/alquilerClienteTabs/enCurso/enCursoCliente';
import { FinalizadoClientePage } from '../pages/alquilerClienteTabs/finalizado/finalizadoCliente';

import { PendienteProveedorPage } from '../pages/alquilerProveedorTabs/pendiente/pendienteProveedor';
import { EnCursoProveedorPage } from '../pages/alquilerProveedorTabs/enCurso/enCursoProveedor';
import { FinalizadoProveedorPage } from '../pages/alquilerProveedorTabs/finalizado/finalizadoProveedor';


import { MisHerramientasPage } from '../pages/misHerramientas/misHerramientas';


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
    AddQualifyPage,
    HerramientaPage,
    ModalContactoPage,
    AlquilerClienteTabsPage,AlquilerProveedorTabsPage,
    PendienteClientePage,EnCursoClientePage,FinalizadoClientePage,
    PendienteProveedorPage,EnCursoProveedorPage,FinalizadoProveedorPage,
    MisHerramientasPage,
    EditServicePage
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
    AlquilerClienteTabsPage,AlquilerProveedorTabsPage,
    AddQualifyPage,
    HerramientaPage,
    ModalContactoPage,
    PendienteClientePage,EnCursoClientePage,FinalizadoClientePage,
    PendienteProveedorPage,EnCursoProveedorPage,FinalizadoProveedorPage,
    MisHerramientasPage,
    EditServicePage
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
