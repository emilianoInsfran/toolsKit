import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
/*
import { LoadingController, AlertController, Platform } from '@ionic/angular';
*/
import { HomePage } from '../home/home';
import { ResultadosPage } from '../resultados/resultados';



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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private googlePlus: GooglePlus, 
    private nativeStorage: NativeStorage, 
    public loadingCtrl: LoadingController,
    private platform: Platform
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.nativeStorage.getItem('google_user')
    .then(data => {
      if(data != null){
        this.navCtrl.push( ResultadosPage );
      }
      loading.dismiss();
    }, error =>{
      console.log(error);
      if(!this.platform.is('cordova')){
          this.navCtrl.push( ResultadosPage );
        }
      loading.dismiss();
    });
  }

  gotoPage() {
    this.navCtrl.push( ResultadosPage );
  }

  doGoogleLogin(){

    if(!this.platform.is('cordova')){
      this.navCtrl.push( ResultadosPage );
    }
    else{//autenticacion de google de momento solo con cordova
      let loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
           this.navCtrl.push( ResultadosPage );
        }, (error) => {
          console.log(error);
          if(!this.platform.is('cordova')){
            this.navCtrl.push( ResultadosPage );
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
}
