import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RequiredValidator } from '@angular/forms';

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
  usuario: string = '';
  contacto: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController ) {
  }
  contactoUser(){
    if (this.usuario==""){
      const toast =this.toastCtrl.create({
        message: "usuario Requerido",
        duration: 3000
      });
      toast.present();
    }else if(this.contacto==""){
      const toast =this.toastCtrl.create({
        message: "Forma de contacto Requerida",
        duration: 3000
      });
      toast.present();
    }else{
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
  }

}
