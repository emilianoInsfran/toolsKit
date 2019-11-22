import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { UtilService } from  '../../providers/utilService';
import { ModalContactoPage } from '../modal-contacto/modal-contacto';



@IonicPage()
@Component({
  selector: 'page-herramienta',
  templateUrl: 'herramienta.html',
})
export class HerramientaPage {

  usuario={};
  herramienta={};
  opiniones;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    public util: UtilService,
    public modalcontroller: ModalController
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
    .then(()=>this.loadDetalleHerramienta(this.navParams.get('herramienta').id))
    .then(()=>this.util.hideLoading());
  }

  loadDetalleHerramienta(idHerramienta){
    
    this.getHerramienta(idHerramienta)
    .subscribe(herramienta => {
      this.herramienta = herramienta;
      this.opiniones = (! this.util.isEmpty((<any>herramienta).reputacion) ) ?(<any>herramienta).reputacion.length:0;
    });
  }


  getHerramienta(id){
    return this.http.get(Config.heroku_backend_url+'herramientas/'+id);
  }

  loadUsuario(){
    return this.storage.get('backend_user');
  }
  abrirModal(){
    //let modal =this.modalcontroller.create(ModalContactoPage);
    //modal.present();
    this.navCtrl.push(ModalContactoPage,{herramienta: this.herramienta, usuario: this.usuario});
  }

}
