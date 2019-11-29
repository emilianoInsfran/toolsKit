import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { PendienteClientePage } from './pendiente/pendienteCliente';
import { FinalizadoClientePage } from './finalizado/finalizadoCliente';
import { EnCursoClientePage } from './enCurso/enCursoCliente';
import { UtilService } from  '../../providers/utilService';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-alquilerClienteTabs',
  templateUrl: 'alquilerClienteTabs.html',
})

export class AlquilerClienteTabsPage {

  tab1Root = PendienteClientePage;
  tab2Root = EnCursoClientePage;
  tab3Root = FinalizadoClientePage;
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
