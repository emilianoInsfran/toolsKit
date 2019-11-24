import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';

import { MyFilterPipe } from '../../app/order.pipe';
import { HttpClient } from '@angular/common/http';

import { Config } from '../../config';
import { HerramientaPage } from '../herramienta/herramienta';
import { UtilService } from  '../../providers/utilService';

/**
 * Generated class for the ResultadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})

@Pipe({
  name: 'orderBy'
})

export class ResultadosPage {
  herramientas = []; 
  pedidoHerramienta:string;
  ord:boolean =true;
  fil:boolean = true;
  myFilterPipe2: string;
  order: string; 
  ubicacionHerramienta;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public util: UtilService) {
  }

  ionViewDidLoad() {
    //this.obtenerHerramientas();
    this.getUbicacion();
    this.showConfig('');// cuando entro por primera vez el usuario y no le paso ningun parametro (null o undefine o '') me tiene que traer las herramientas de mejor puntuación (ej: martillo-taladro-mezclarora-etc)

    console.log('ionViewDidLoad ResultadosPage');
  } 

  getUbicacion(){
    this.ubicacionHerramienta = Config.ZONAS;
  }

  getConfigHerramientas(obj) {
    return this.http.get(Config.heroku_backend_url+'herramientas?page=&limit=');
  }

  showConfig(obj) {
    this.getConfigHerramientas(obj)
      .subscribe(herramientas => {
                console.log('data:',herramientas);
                this.obtenerHerramientas(herramientas);
      });
  }

  mostrarFiltro(id) {
    console.log(id);
    if(id=="ordenar"){
      this.ord = false;
    }
    else if (id=='filtrar') {
      this.fil = false;
    }
  }

  hidePopUp(){
    console.log("-----------",this.myFilterPipe2);
    
      this.fil = true;
      this.ord = true;
  }

  buscarHerramientas() {
    let obj = {
      herramienta: this.pedidoHerramienta
    }

    this.showConfig(obj)// le pasas ese parametro - leer linea 43 
  }

  //filtro seria por puntuación, precio, ubicacion
  obtenerHerramientas(array) {
    this.herramientas = array.rows;
    this.order = 'number'
  }

  gotoHerramienta(data) {
    console.log(data);
    this.util.showLoading("Cargando");
    this.navCtrl.push(HerramientaPage,{herramienta: data});
    //this.navCtrl.setRoot( HerramientaPage ,{herramienta: data});
  }


}
