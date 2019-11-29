import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AltaServicePage } from '../pages/alta-service/alta-service';

import { ResultadosPage } from '../pages/resultados/resultados';
import { UserPage } from '../pages/user/user';
import { AlquilerProveedorTabsPage } from '../pages/alquilerProveedorTabs/alquilerProveedorTabs';
import { AlquilerClienteTabsPage } from '../pages/alquilerClienteTabs/alquilerClienteTabs';
import { Storage } from '@ionic/storage';
import { UtilService } from  '../providers/utilService';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { MisHerramientasPage } from '../pages/misHerramientas/misHerramientas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = ResultadosPage;
  pages: Array<{title: string, component: any}>;
  alquileresPage: Array<{title: string, component: any}>;
  herramientasPage: Array<{title: string, component: any}>;

  firebasePlugin;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertController:AlertController, private storage: Storage, public util: UtilService,
    private http: HttpClient) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        { title: 'Home', component: ResultadosPage },
        { title: 'Mi cuenta', component: UserPage },
        { title: 'Publicar', component: AltaServicePage }
      ];

      this.alquileresPage = [
        { title: 'Cliente', component: AlquilerClienteTabsPage },
        { title: 'Proveedor', component: AlquilerProveedorTabsPage },
      ];

      this.herramientasPage = [
        { title: 'Mis Herramientas', component: MisHerramientasPage },
      ];


      this.loadFirebase();
    })
    .then(()=>{
      this.getToken();
    });
  }


  openPage(page) {
    this.nav.setRoot(page.component);
  }

  loadFirebase(){
    if(this.platform.is('cordova')){
      this.firebasePlugin = (<any>window).FirebasePlugin;
      this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
    }
  }

  getToken() {
    if(this.platform.is('cordova')){
      this.firebasePlugin.getToken(token => {
        console.log("token registrado: "+ token);
        this.storage.set("fcmToken",token);
        this.checkUsuarioRegistrado(token);
      });

      this.firebasePlugin.onTokenRefresh(token => {
        console.log("token actualizado: "+ token);
        this.storage.set("fcmToken",token);
        this.checkUsuarioRegistrado(token);
      });
    }
  }

  onMessageReceived(message){
    if (message.tap) { console.log(`Notification was tapped in the ${message.tap}`); }

    const alert = this.alertController.create({
      title: message.title,
      subTitle: message.body,
      buttons: ['OK']
    });
    alert.present();
  }

  checkUsuarioRegistrado(token){
    this.storage.get('backend_user')
    .then(backend_user => {
      if(!this.util.isEmpty(backend_user)){
        if(backend_user.fcmToken != token){
          this.updateFcmTokenUsuario(backend_user, token);
        }
      }
    });
  }

  updateFcmTokenUsuario(user,token){
    this.http.put(Config.heroku_backend_url+'usuarios/' + user.id ,{email:user.email, fcmToken:token} )
    .subscribe(
      backend_user => {
        console.log(JSON.stringify(backend_user));
        this.storage.set('backend_user', backend_user)
      },
      err => {
        console.log("Error occured " + err);
      }
    );
  }

}

