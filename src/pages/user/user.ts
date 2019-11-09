import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';

import { AuthenticatorService } from '../../providers/authenticatorService';
import { Storage } from '@ionic/storage';

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
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private authenticator: AuthenticatorService
  ) { }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    loading.present();
    this.storage.get('google_user')
    .then(data => {
      if(data){
        this.user = {
          name: data.name,
          email: data.email,
          picture: data.picture
        };
        this.userReady = true;
      }
      loading.dismiss();
    }, error =>{
      console.log(error);
      loading.dismiss();
    });
  }

  doGoogleLogout(){
    this.authenticator.doOauthLogout("Google")
    .then(res => {
      //user logged out so we will remove him from the NativeStorage
      this.storage.remove('google_user');
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
