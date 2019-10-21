import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../home/home';
import { ResultadosPage } from '../resultados/resultados';

import { HttpClient } from '@angular/common/http';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user=null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private googlePlus: GooglePlus, 
    private nativeStorage: NativeStorage, 
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private http: HttpClient
    ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    loading.present();
    this.nativeStorage.getItem('google_user')
    .then(data => {
      if(data != null){
        this.doBackendLogin(data.info);
      }
      loading.dismiss();
    }, error =>{
      console.log(error);
      if(!this.platform.is('cordova')){
          this.gotoPage();
        }
      loading.dismiss();
    });
  }

  gotoPage() {
    this.navCtrl.setRoot( ResultadosPage );
  }

  doGoogleLogin(){
    if(!this.platform.is('cordova')){
      this.gotoPage();
    }
    else{//autenticacion de google de momento solo con cordova
      let loading = this.loadingCtrl.create({
        content: 'Por favor espere'
      });
      loading.present();
      this.googlePlus.login({})
        .then(res => {
          //save user data on the native storage
          this.nativeStorage.setItem('google_user', {
            name: res.displayName,
            email: res.email,
            picture: res.imageUrl,
            info:JSON.stringify(res)
          })
          .then(() => {
            this.doBackendLogin(res);
          }, (error) => {
            console.log(error);
            if(!this.platform.is('cordova')){
              this.gotoPage();
            }
          })
          loading.dismiss();
          })
        .catch((err) => {
          console.error(err)
          loading.dismiss();
        })
    }

  
  }


  doBackendLogin(user){
      this.http.post('https://herramientas-backend.herokuapp.com/usuarios',{email: user.email, accessToken: user.accessToken, nombre: user.nombre, apellido: user.apellido})
      .subscribe(
        res => {
          this.nativeStorage.setItem('backend_user', {
            info:JSON.stringify(res)
          })
          .then(()=>{
            this.gotoPage()
          })
        },
        err => {
          console.log("Error occured");
        }
      );
    }
}
