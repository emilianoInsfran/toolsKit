import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorService } from '../../providers/authenticatorService';
import { Config } from '../../config';


@IonicPage()
@Component({
  selector: 'page-herramienta',
  templateUrl: 'herramienta.html',
})
export class HerramientaPage {

  usuario={};
  herramienta={};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private authenticator: AuthenticatorService
    )
    {
    this.init();
  }

  ionViewDidLoad() {
    console.log("herr",this.navParams.get('herramienta'));
    
    
  }

  init(){
    this.loadUsuario()
    .then(usuario=>{
      this.usuario = usuario;
    })
    .then(()=>this.loadDetalleHerramienta(this.navParams.get('herramienta').id));
  }

  loadDetalleHerramienta(idHerramienta){
    
    this.getHerramienta(idHerramienta)
    .subscribe(herramienta => {
      this.herramienta = herramienta;
    });
  }


  getHerramienta(id){
    return this.http.get(Config.heroku_backend_url+'herramientas/'+id);
  }

  loadUsuario(){
    return this.storage.get('backend_user');
  }

}
