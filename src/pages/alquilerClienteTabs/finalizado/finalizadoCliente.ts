import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Pipe } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../config';
import { UtilService } from  '../../../providers/utilService';


@IonicPage()
@Component({
  selector: 'page-finalizadoCliente',
  templateUrl: 'finalizadoCliente.html',
})

@Pipe({
  name: 'orderBy'
})

export class FinalizadoClientePage {
  usuario;
  solicitudes;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public util: UtilService,
    private storage: Storage,
    public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.storage.get('backend_user')
    .then(backend_user => {
      this.usuario = backend_user;
    })
    .then(()=>{
      var query = `?cliente=${this.usuario.id}&finalizado`;
      this.loadSolicitudes(query);
    })
  }

  loadSolicitudes(query){
    this.getSolicitudes(query)
    .subscribe(solicitudes => {
      console.log('data:',solicitudes);
      this.solicitudes = solicitudes;
      if(this.util.isEmpty(solicitudes)){
        const toast =this.toastCtrl.create({
          message:"No tienes solicitudes finalizadas",
          duration:3000
        });
        toast.present();
      }
    });
  }

  getSolicitudes(query) {
    return this.http.get(Config.heroku_backend_url+'alquileres'+query);
  }


}
