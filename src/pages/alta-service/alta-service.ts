import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';

/**
 * Generated class for the AltaServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-service',
  templateUrl: 'alta-service.html',
})
export class AltaServicePage {
  name: string='';
  cant: string='';
  file: string='';
  ctria: string='';
    /**'Albañileria',
    'Electricidad',
    'Industriales',
    'Cortar',
    'Sujecion',
    'Jardineria y Paisajismo'
  ];*/
  descripcion='';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }


publicar(){
  if(this.name==""){
    const toast =this.toastCtrl.create({
      message:"Nombre es requerido",
      duration:3000
    });
    toast.present();
  }else  if(this.cant==""){
    const toast =this.toastCtrl.create({
      message:"Cantidad es requerida",
      duration:3000
  });
  toast.present();
  }else  if(this.file==""){
    const toast =this.toastCtrl.create({
      message:"Imagen es requerida",
      duration:3000
    });
    toast.present();
  }else  if(this.ctria==""){
    const toast =this.toastCtrl.create({
      message:"Categoria es requerida",
      duration:3000
    });
    toast.present();
  }else  if(this.descripcion==""){
      const toast =this.toastCtrl.create({
        message:"Descripcion es requerida",
        duration:3000
      });
      toast.present();

  }else{
    const toast =this.toastCtrl.create({
      message:"Publicacion exitosa",
      duration:3000
    });
    toast.present();
  }
    console.log('Enviado')
    //proses if the password and username have been fillend in.
    
  }
}
