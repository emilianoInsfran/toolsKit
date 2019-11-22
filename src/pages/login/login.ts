import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ResultadosPage } from '../resultados/resultados';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorService } from '../../providers/authenticatorService';
import { Config } from '../../config';



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
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private authenticator: AuthenticatorService
    ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    loading.present();
    this.storage.get('google_user')
    .then(data => {
      if(data != null){
        this.doBackendLogin(data);
      }
      loading.dismiss();
    }, error =>{
      console.log(error);
      loading.dismiss();
    });
  }

  gotoPage() {
    this.navCtrl.setRoot( ResultadosPage );
  }

  doGoogleLogin(){
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    this.authenticator.doOauthLogin("Google")
    .then((user) => {
      this.storage.set('google_user', user).then(() =>this.doBackendLogin(user));
    }).catch((err) => {
      console.error(err)
      loading.dismiss();
    });
  
  }


  doBackendLogin(user){
      this.http.post(Config.heroku_backend_url+'usuarios' ,{email: user.email, accessToken: user.accessToken, nombre: user.nombre, apellido: user.apellido})
      .subscribe(
        res => {
          this.storage.set('backend_user', res)
          .then(()=>{
            this.gotoPage()
          })
          .catch((err) => {
            this.gotoPage()
          })
        },
        err => {
          console.log("Error occured");
        }
      );
    }
}
