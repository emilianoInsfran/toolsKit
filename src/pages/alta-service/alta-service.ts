import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, Slides} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { UtilService } from  '../../providers/utilService';
import { LoginPage } from '../login/login';
import { ResultadosPage } from '../resultados/resultados';



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

  @ViewChild(Slides) slides: Slides;

  zonas= Config.ZONAS;
  
  
  domicilios = null;
  usuario=null
  tiposHerramienta=[]
  imagenes = []
  imagenesTMP=null

  herramienta = { 
    nombre:null,
    descripcion:null,
    usuario:null,
    precio: null,
    imagenes:[],
    cantidad:0,
    disponible:1,
    domicilio:null,
    tipoHerramienta:null
  }

  hideCustomDomicilioFields = true

  domicilio;
  customDomicilio={
    usuario:null,
    calle: null,
    nro: null,
    zona:null,
    codPostal: null
  }
  

  constructor(
  	public navCtrl: NavController, 
	  public navParams: NavParams, 
	  public toastCtrl: ToastController,
	  private http: HttpClient, 
    private storage: Storage, 
    public util: UtilService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaServicePage');
    this.loadUsuario();
  }
  

  validacionAlert(){

    var nombreValid = this.validateNombre(this.herramienta.nombre);
    var precioValid = this.validatePrecio(this.herramienta.precio);
    var cantidadValid = this.validateCantidad(this.herramienta.cantidad);
    var tipoValid = this.validateTipoHerramienta(this.herramienta.tipoHerramienta);
    var domicilioValid = this.validateDomicilio(this.domicilio);
    var imagenesValid = this.validateImagenes(this.herramienta.imagenes);
    var descValid = this.validateDescripcion(this.herramienta.descripcion);

    if(!nombreValid.isValid){
      const toast =this.toastCtrl.create({
        message:nombreValid.message,
        duration:3000
      });
      toast.present();
    }
    else  if(!cantidadValid.isValid){
      const toast =this.toastCtrl.create({
        message:cantidadValid.message,
        duration:3000
      });
      toast.present();

    }
    else  if(!precioValid.isValid){
        const toast =this.toastCtrl.create({
          message:precioValid.message,
          duration:3000
      });
      toast.present();
    }
    else  if(!imagenesValid.isValid){
      const toast =this.toastCtrl.create({
        message:imagenesValid.message,
        duration:3000
      });
      toast.present();
    }else  if(!tipoValid.isValid){
      const toast =this.toastCtrl.create({
        message:tipoValid.message,
        duration:3000
      });
      toast.present();
    }else  if(!domicilioValid.isValid){
      const toast =this.toastCtrl.create({
        message:domicilioValid.message,
        duration:3000
      });
      toast.present();
    }else  if(!descValid.isValid){
        const toast =this.toastCtrl.create({
          message:descValid.message,
          duration:3000
        });
        toast.present();

    }
    
  }


  loadUsuario(){
    this.storage.get('backend_user')
    .then(usuario => {
      if(this.util.isEmpty(usuario)){
        this.navCtrl.setRoot( LoginPage );ResultadosPage
        const toast =this.toastCtrl.create({
          message:"Debe estar logueado para poder publicar",
          duration:3000
        });
        toast.present();
      }
      else{
        this.usuario = usuario;
        this.herramienta.usuario = usuario.id
        this.loadDomicilio();
      }
      
    });
  }

  loadDomicilio(){
    this.http.get(Config.heroku_backend_url+'usuarios/' + this.usuario.id + "/domicilios")
    .subscribe(
      domicilios => {
        this.domicilios = domicilios;
        this.storage.set('backend_user_domicilios', domicilios)
        this.loadTiposHerramientas();
      },
      err => {
        console.log("Error occured");
        this.loadTiposHerramientas();
      }
    );
  }

  loadTiposHerramientas(){
    this.getTiposHerramientas()
    .subscribe(tipos => {
      this.tiposHerramienta = (<any> tipos).rows;
    });
  }


  getTiposHerramientas(){
    return this.http.get(Config.heroku_backend_url+'herramientas/tipos');
  }

  onSubmitHerramienta(){
    this.util.showLoading('Por favor espere');
    this.herramienta.imagenes=[];
    this.imagenes.map(i=>{
      this.herramienta.imagenes.push(i.url);
    })
    
    if(!this.validateHerramienta()){
      this.util.hideLoading();
      this.validacionAlert()
    }
    else{
      this.util.hideLoading();
      this.guardarHerramienta();
    }
  }

  validateHerramienta(){
    let isValid=true;
    if( 
      !this.validateNombre(this.herramienta.nombre).isValid 
      || !this.validatePrecio(this.herramienta.precio).isValid 
      || !this.validateCantidad(this.herramienta.cantidad).isValid 
      || !this.validateTipoHerramienta(this.herramienta.tipoHerramienta).isValid
      || !this.validateDomicilio(this.domicilio).isValid
      || !this.validateImagenes(this.herramienta.imagenes).isValid
      || !this.validateDescripcion(this.herramienta.descripcion).isValid
      ){
      isValid = false;
    }
    return isValid;
  }

  validateNombre(nombre){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(nombre) ){
      result.isValid = false;
      result.message = "Nombre es requerido";
    }
    return result;
  }

  validatePrecio(precio){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(precio) ){
      result.isValid = false;
      result.message = "Precio es requerido";
    }
    else if(precio <= 0){
      result.isValid = false;
      result.message = "Precio debe ser mayor a cero";
    }
    return result;
  }

  validateCantidad(cantidad){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(cantidad) ){
      result.isValid = false;
      result.message = "Cantidad es requerida";
    }
    else if(cantidad <= 0){
      result.isValid = false;
      result.message = "Cantidad debe ser mayor a cero";
    }
    return result;
  }

  validateTipoHerramienta(tipo){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(tipo) ){
      result.isValid = false;
      result.message = "Tipo Herramienta es requerido";
    }
    return result;
  }

  validateImagenes(imagenes){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(imagenes) ){
      result.isValid = false;
      result.message = "Debe cargar al menos una imagen";
    }
    return result;
  }

  validateDescripcion(descripcion){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(descripcion) ){
      result.isValid = false;
      result.message = "Descripción es requerida";
    }
    return result;
  }

  validateDomicilio(domicilio){
    let result = {isValid:true,message:""};
    if( this.util.isEmpty(domicilio) ){
      result.isValid = false;
      result.message = "Domicilio es requerido";
    }
    else if(domicilio == "Otro"){
      if( this.util.isEmpty(this.customDomicilio.calle) ){
        result.isValid = false;
        result.message = "Calle es requerida";
      }
      else if( this.util.isEmpty(this.customDomicilio.nro) ){
        result.isValid = false;
        result.message = "Número es requerido";
      }
      else if( this.util.isEmpty(this.customDomicilio.codPostal) ){
        result.isValid = false;
        result.message = "Código Postal es requerido";
      }
      else if( this.util.isEmpty(this.customDomicilio.zona) ){
        result.isValid = false;
        result.message = "Zona es requerida";
      }
    }
    return result;
  }

  guardarHerramienta(){
    this.util.showLoading('Publicando...')
    this.postHerramienta(this.herramienta)
    .subscribe(
      res => {
        this.util.hideLoading();
        this.navCtrl.setRoot( ResultadosPage );
        const toast =this.toastCtrl.create({
          message:"Herramienta publicada!",
          duration:3000
        });
        toast.present();
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al publicar la herramienta",
          duration:3000
        });
        toast.present();
      }
    );
  }

  setDomicilio(){
    if(this.domicilio == "Otro"){
      this.herramienta.domicilio = this.customDomicilio;
    }
    else{
      this.domicilios.map(domicilio=>{
        if(this.domicilio == domicilio.id){
          this.herramienta.domicilio = domicilio;
        }
      });
    }
  }

  postHerramienta(herramienta){
    herramienta.precio = parseFloat(herramienta.precio);
    herramienta.cantidad = parseFloat(herramienta.cantidad);
    this.setDomicilio();
    
    return this.http.post(Config.heroku_backend_url+'herramientas', herramienta);
  }

  onFileSelectChange(event){
    if(event.target.files != null && event.target.files.length > 0){
      var file = event.target.files[0];
      if(!this.alreadyExistImage(file.name)){
        this.util.showLoading('Cargando Imagen..')
        const formData = new FormData();
        formData.append('file', file, file.name);
        this.http.post(Config.heroku_backend_url+'upload/v2', formData).subscribe(
          res => {
            this.imagenes.push({ nombre: file.name , url: (<any>res).url});
            this.imagenesTMP = null;
            this.util.hideLoading();
          },
          err => {
            console.log("Error occured", err);
            const toast =this.toastCtrl.create({
              message:"No se pudo cargar la imagen",
              duration:3000
            });
            toast.present();
            this.imagenesTMP = null;
            this.util.hideLoading();
          }
        );
      }
      
    }
  }

  alreadyExistImage(nombre){
    var exist= false;
    this.imagenes.map(imagen=>{
      if(imagen.nombre == nombre){
        exist=true;
      }
    })
    return exist;
  }

  removeImage(nombre){
    for( var i = 0; i < this.imagenes.length; i++){ 
      if ( this.imagenes[i].nombre == nombre) {
        this.imagenes.splice(i, 1);
        if(i==0){
          this.slides.slideTo(0)
        }else{
          this.slides.slideTo(i-1);
        } 
        break;
      }
    }
  }

  onChangeDomicilio(){
    if(this.domicilio == "Otro"){
      this.hideCustomDomicilioFields = false;
    }
    else{
      this.hideCustomDomicilioFields = true;
      this.customDomicilio={
        usuario:null,
        calle: null,
        nro: null,
        zona:null,
        codPostal: null
      }
    }
  }



}
