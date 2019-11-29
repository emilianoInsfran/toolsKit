import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { PendienteProveedorPage } from './pendiente/pendienteProveedor';
import { FinalizadoProveedorPage } from './finalizado/finalizadoProveedor';
import { EnCursoProveedorPage } from './enCurso/enCursoProveedor';
import { UtilService } from  '../../providers/utilService';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-alquilerProveedorTabs',
  templateUrl: 'alquilerProveedorTabs.html',
})

export class AlquilerProveedorTabsPage {

  tab1Root = PendienteProveedorPage;
  tab2Root = EnCursoProveedorPage;
  tab3Root = FinalizadoProveedorPage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: Storage,
    public util: UtilService,
    public toastCtrl: ToastController) {
      this.load();
  }

  load() {
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
      
    });
  } 


  
  

}
