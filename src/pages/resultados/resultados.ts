import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class ResultadosPage {
  herramientas = []; 
  pedidoHerramienta:string;
  ord:boolean =true;
  fil:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.obtenerHerramientas();
    console.log('ionViewDidLoad ResultadosPage');
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
        nombre:'Mezcladora',
        precio:'70',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/mezcladora.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Ezeiza'
      },
      {
        nombre:'Taladro',
        precio:'60',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/taladro.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Ezeiza' 
      },
      { 
        nombre:'kit Herramientas',
        precio:'150',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/martillos.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Monte Grande'
      },
      { 
        nombre:'kit Herramientas',
        precio:'50',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/martillos.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Monte Grande'
      },
      { 
        nombre:'kit Herramientas',
        precio:'150',
        moneda:'$',
        disponible:true,
        urlImagen:'../../assets/imgs/martillos.png',
        descripción:'aca va una descripción',
        propietario:'Nombre Apellido',
        ubicacion:'Monte Grande'
      }
    ]
  }


}
