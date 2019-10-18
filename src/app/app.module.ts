import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResultadosPage } from '../pages/resultados/resultados';
import { OrderModule } from 'ngx-order-pipe';
import { MyFilterPipe } from './order.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultadosPage,
    LoginPage,
    MyFilterPipe
  ],
  imports: [
    BrowserModule,
    OrderModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultadosPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [MyFilterPipe]
})
export class AppModule {}
