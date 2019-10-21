import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { ResultadosPage } from '../resultados/resultados';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private googlePlus: GooglePlus, 
    private nativeStorage: NativeStorage, 
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    loading.present();
    this.nativeStorage.getItem('google_user')
    .then(data => {
      this.user = {
        name: data.name,
        email: data.email,
        picture: data.picture,
        info:data.info
      };
      this.userReady = true;
      loading.dismiss();
    }, error =>{
      console.log(error);
      loading.dismiss();
    });
  }

  doGoogleLogout(){
    this.googlePlus.logout()
    .then(res => {
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('google_user');
      this.userReady = false;
      this.gotoPage() 
    }, err => {
      console.log(err);
    });
  }

  gotoPage() {
    this.navCtrl.setRoot( ResultadosPage );
  }

}
