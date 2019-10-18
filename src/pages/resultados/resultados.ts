import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';

import { MyFilterPipe } from '../../app/order.pipe';


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
  ubicacionHerramienta=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.obtenerHerramientas();
    this.getUbicacion();

    console.log('ionViewDidLoad ResultadosPage');
  } 

  getUbicacion(){
    this.ubicacionHerramienta = [
      {
        nombre:'Ezeiza'
      },{
        nombre:'Monte Grande'
      },{
        nombre:'Avellaneda'
      }
    ]
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
    console.log("herramienta",this.pedidoHerramienta);
  }

  //filtro seria por puntuación, precio, ubicacion
  obtenerHerramientas() {
    this.herramientas =
    [
      {
        id:'1',
        nombre:'Mezcladora',
        number:'70',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/mezcladora.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Ezeiza'
      },
      {
        id:'2',
        nombre:'Taladro',
        number:'60',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/taladro.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Ezeiza' 
      },
      { 
        id:'1',
        nombre:'kit Herramientas',
        number:'150',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/martillos.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Monte Grande'
      },
      { 
        id:'1',
        nombre:'kit Herramientas',
        number:'150',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/martillos.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Monte Grande'
      },
      { 
        id:'1',
        nombre:'kit Herramientas',
        number:'150',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/martillos.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Avellaneda'
      }
    ]

    this.order = 'number'
  }


}
