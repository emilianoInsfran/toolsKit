import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';

import { AuthenticatorService } from '../../providers/authenticatorService';
import { Storage } from '@ionic/storage';

import { ResultadosPage } from '../resultados/resultados';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: any;
  userReady: boolean = false;

  allData:any;
  otherUser:boolean;
  edit:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private authenticator: AuthenticatorService
  ) {

    this.allData = this.navParams.get('dataService');
    console.log('usuario seleccionado. ', this.allData);
    this.getInfo();
   }

  ionViewDidLoad() {


  }

  getInfo(){
    console.log('otro usuario',this.allData);
    if(this.allData != undefined){
      console.log('otro usuario');
      this.user = {
        name:"otro usuario",
        apellido:"apellido",
        email:'miemail@gmail.com',
        picture:['../../assets/imgs/user.jpg'],
        ubicacion:'Ezeiza',
        reputacion:'50%',
        comentarios:"muy buena las herramiensta, estan en buen estado",
        tel:123456789,
        herramientas:[              {
          nombre:'martillo',
          precio:20
        },
        {
          nombre:'taladro',
          precio:20
        }]
      }
      this.userReady = true;
      this.otherUser = true;

    }else {
      console.log('userapp');
      this.otherUser = false;
      let loading = this.loadingCtrl.create({
        content: 'Por favor espere'
      });
      loading.present();
      this.storage.get('google_user')
      .then(data => {
        if(data){
          console.log("user",data);
          this.user = {
            name: data.nombre,
            apellido:data.apellido,
            email: data.email,
            picture: data.picture,
            ubicacion:'Ezeiza',
            reputacion:'50%',
            comentarios:"muy buena las herramiensta, estan en buen estado",
            tel:123456789,
            
            herramientas:[
              {
                nombre:'martillo',
                precio:20
              },
              {
                nombre:'taladro',
                precio:20
              }
              ]
          };
          this.userReady = true;
          this.otherUser = false;

        }
        loading.dismiss();
      }, error =>{
        console.log(error);
        loading.dismiss();
      });
    }
  }

  doGoogleLogout(){
    this.authenticator.doOauthLogout("Google")
    .then(res => {
      //user logged out so we will remove him from the NativeStorage
      this.storage.remove('google_user');
      this.storage.remove('backend_user');
      this.userReady = false;
      this.gotoPage() 
    }, err => {
      console.log(err);
    });
  }

  gotoPage() {
    this.navCtrl.setRoot( LoginPage );
  }

  editar(){
    this.edit = true;
  }
  saveChange(){
    this.edit = false;
  }

}
