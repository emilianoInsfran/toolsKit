import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RequiredValidator } from '@angular/forms';
import { UtilService } from  '../../providers/utilService';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';

/**
 * Generated class for the ModalContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-contacto',
  templateUrl: 'modal-contacto.html',
})
export class ModalContactoPage {
  contacto: string = '';
  cantidad=1;
  dias=1;
  cantidadMax=1;
  precioPorDia=0;
  precioTotal=0;
  herramienta:any;
  usuario:any;
  dueño:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController , public util: UtilService, private http: HttpClient ) {
  }
  contactoUser(){
    if (this.util.isEmpty(this.dias) || this.dias < 1 ){
      const toast =this.toastCtrl.create({
        message: "Debe alquilar por al menos un dia.",
        duration: 3000
      });
      toast.present();
    }else{
      this.solicitarAlquiler();
      const toast =this.toastCtrl.create({
        message: "Solicitud Enviada",
        duration: 3000
      });
      toast.present();
      console.log("success")
    }
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContactoPage');
    debugger;
    this.herramienta = this.navParams.get('herramienta');
    this.usuario = this.navParams.get('usuario');
    this.cantidadMax = this.herramienta.cantidad;
    this.precioPorDia = this.herramienta.precio;
    this.dueño = this.herramienta.usuario;
    this.onChangeDias();
  }

  onChangeDias(){
    this.precioTotal=(this.dias>=1)?this.cantidad*this.dias*this.precioPorDia : 0;
  }

  solicitarAlquiler(){
    this.util.showLoading('Publicando...')
    this.postAlquiler()
    .subscribe(
      res => {
        this.util.hideLoading();
        this.navCtrl.pop();
        const toast =this.toastCtrl.create({
          message:"Petición creada!",
          duration:3000
        });
        toast.present();
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al solicitar herramienta",
          duration:3000
        });
        toast.present();
      }
    );
  }

  postAlquiler(){
    
    return this.http.post(Config.heroku_backend_url+'alquileres', {
      cliente:this.usuario.id,
      herramienta:this.herramienta.id,
      proveedor:this.herramienta.usuario.id,
      monto:this.precioTotal,
      dias:this.dias,
      cantidad:this.cantidad
    });
  }

}
