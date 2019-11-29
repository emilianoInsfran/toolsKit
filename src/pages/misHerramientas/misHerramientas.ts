import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, ModalController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { UtilService } from  '../../providers/utilService';
import { ModalContactoPage } from '../modal-contacto/modal-contacto';
import { LoginPage } from '../login/login';
import { EditServicePage } from '../edit-service/edit-service';



@IonicPage()
@Component({
  selector: 'page-misHerramientas',
  templateUrl: 'misHerramientas.html',
})
export class MisHerramientasPage {

  usuario:any;
  herramientas:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    public util: UtilService,
    public modalcontroller: ModalController,
    public toastCtrl: ToastController
    )
    {
    this.init();
  }

  init() {
    this.storage.get('backend_user')
    .then(usuario => {
      if(this.util.isEmpty(usuario)){
        this.navCtrl.setRoot( LoginPage );
        const toast =this.toastCtrl.create({
          message:"Debe estar logueado para poder acceder",
          duration:3000
        });
        toast.present();
      }
      else{
        this.usuario = usuario;
        this.loadHerramientas(this.usuario.id);
      }
      
    });
  } 

  loadHerramientas(usuarioId){
    this.getHerramientas(usuarioId)
    .subscribe(herramientas => {
      console.log('data:',herramientas);
      this.herramientas = (<any>herramientas).rows;
    });
  }

  getHerramientas(usuarioId) {
    return this.http.get(Config.heroku_backend_url+'herramientas?usuario='+usuarioId);
  }

  gotoHerramienta(data) {
    console.log(data);
    this.util.showLoading("Cargando");
    this.navCtrl.push(EditServicePage,{herramienta: data});
  }
}
