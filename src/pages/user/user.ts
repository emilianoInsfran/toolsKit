import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController,  ToastController, ModalController, ViewController, AlertController  } from 'ionic-angular';
import { AuthenticatorService } from '../../providers/authenticatorService';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { Config } from '../../config';
import { UtilService } from  '../../providers/utilService';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  domicilios:any;
  userGoogle: any;
  user:any;
  userReady: boolean = false;
  currentDomicilio:any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private storage: Storage,
      public loadingCtrl: LoadingController,
      private authenticator: AuthenticatorService,
      private http: HttpClient,
      public util: UtilService,
      public toastCtrl: ToastController,
      public modalCtrl: ModalController,
      public alertCtrl: AlertController
    ){

    
   }

   ionViewDidLoad(){
      this.getInfo();
   }

  getInfo(){
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    loading.present();
    this.storage.get('google_user')
    .then(google_user => {
      if(!this.util.isEmpty(google_user)){
        this.userGoogle = google_user;
        this.storage.get('backend_user')
        .then(backend_user => {
          this.user = backend_user;
          this.refreshUser(this.user);
          this.loadDomicilios(this.user);
          this.userReady = true;
        })
      }
      else{
        this.gotoPage();
        const toast =this.toastCtrl.create({
          message:"Debe iniciar sesion",
          duration:3000
        });
        toast.present();
      }
      loading.dismiss();
    }, error =>{
      console.log(error);
      loading.dismiss();
    });
  }

  doGoogleLogout(){
    this.authenticator.doOauthLogout("Google")
    .then(res => {
      this.storage.remove('google_user');
      this.storage.remove('backend_user');
      this.userReady = false;
      this.gotoPage() 
    }, err => {
      console.log(err);
      this.storage.remove('google_user');
      this.storage.remove('backend_user');
      this.userReady = false;
      this.gotoPage() 
    });
  }

  gotoPage() {
    this.navCtrl.setRoot( LoginPage );
  }


  loadDomicilios(user){
    this.http.get(Config.heroku_backend_url+'usuarios/' + user.id + "/domicilios")
    .subscribe(
      domicilios => {
        this.domicilios = domicilios;
        this.storage.set('backend_user_domicilios', domicilios)
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  refreshUser(user){
    this.http.get(Config.heroku_backend_url+'usuarios/' + user.id )
    .subscribe(
      backend_user => {
        this.user = backend_user;
        this.storage.set('backend_user', backend_user)
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  verDomicilio(idDomicilio){
    this.domicilios.map(domicilio=>{
      if(domicilio.id == idDomicilio){
        this.currentDomicilio = domicilio;
      }
    });
    let contactModal = this.modalCtrl.create(ModalDomicilio, {user:this.user, domicilio: this.currentDomicilio, action:"ver"});

    contactModal.onDidDismiss(data => {
      if(data.success){
        this.loadDomicilios(this.user);
      }
    });
    contactModal.present();
  }

  editarDomicilio(idDomicilio){
    this.domicilios.map(domicilio=>{
      if(domicilio.id == idDomicilio){
        this.currentDomicilio = domicilio;
      }
    });
    let contactModal = this.modalCtrl.create(ModalDomicilio, {user:this.user, domicilio: this.currentDomicilio, action:"editar"});

    contactModal.onDidDismiss(data => {
      if(data.success){
        this.loadDomicilios(this.user);
      }
    });
    contactModal.present();
  }

  eliminarDomicilio(idDomicilio){
    this.domicilios.map(domicilio=>{
      if(domicilio.id == idDomicilio){
        this.currentDomicilio = domicilio;
      }
    });

    const confirm = this.alertCtrl.create({
      title: this.currentDomicilio.calle+" "+ this.currentDomicilio.nro,
      message: 'Esta seguro de querer eliminar la dirección?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.destroyDomicilio();
          }
        }
      ]
    });
    confirm.present();
  }

  destroyDomicilio(){
    this.util.showLoading('Eliminando datos...')
    this.deleteDomicilio()
    .subscribe(
      res => {
        this.loadDomicilios(this.user);
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Dirección eliminada!",
          duration:3000
        });
        toast.present();
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al eliminar los datos",
          duration:3000
        });
        toast.present();
      }
    );
  }

  deleteDomicilio(){
    return this.http.delete(Config.heroku_backend_url+'usuarios/'+this.user.id+"/domicilios/"+this.currentDomicilio.id);
  }

  crearDomicilio(){
    
    let contactModal = this.modalCtrl.create(ModalDomicilio, {user:this.user, action:"crear"});

    contactModal.onDidDismiss(data => {
      if(data.success){
        this.loadDomicilios(this.user);
      }
    });
    contactModal.present();
  }







  editarTelefono(index){
    let contactModal = this.modalCtrl.create(ModalTelefono, {usuario:this.user, index:index, action:"editar"});

    contactModal.onDidDismiss(data => {
      if(data.success){
        this.storage.set('backend_user', this.user)
      }
    });
    contactModal.present();
  }

  eliminarTelefono(index){
    const confirm = this.alertCtrl.create({
      title: this.getTipoTelefono(this.user.telefonos[index].tipo)+" "+ this.user.telefonos[index].numero,
      message: 'Esta seguro de querer eliminar el teléfono?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.destroyTelefono(index);
          }
        }
      ]
    });
    confirm.present();
  }

  destroyTelefono(index){
    this.updateUsuario(this.user.telefonos.splice(index,1));
  }

  updateUsuario(telefono){
    this.util.showLoading('Actualizando datos...');
    console.log()
    this.putUsuario()
    .subscribe(
      res => {
        this.util.hideLoading();
        this.storage.set('backend_user', this.user)
        const toast =this.toastCtrl.create({
          message:"Información actualizada!",
          duration:3000
        });
        toast.present();
      },
      err => {
        this.util.hideLoading();
        this.storage.get('backend_user')
        .then(user=> this.user = user);
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al actualizar los datos",
          duration:3000
        });
        toast.present();
      }
    );
  }


  putUsuario(){
    return this.http.put(Config.heroku_backend_url+'usuarios/'+this.user.id, {telefonos:this.user.telefonos, email:this.user.email});
  }

  crearTelefono(){
    this.user.telefonos.push({});
    let contactModal = this.modalCtrl.create(ModalTelefono, {usuario:this.user, action:"crear", index:this.user.telefonos.length-1});

    contactModal.onDidDismiss(data => {
      if(data.success){
        this.storage.set('backend_user', this.user)
      }
      else{
        this.user.telefonos.pop();
      }
    });
    contactModal.present();
  }




  editarInfoUsuario(){
    let contactModal = this.modalCtrl.create(ModalUsuario, {usuario:this.user});

    contactModal.onDidDismiss(data => {
      if(data.success){
        this.storage.set('backend_user', this.user)
      }
    });
    contactModal.present();
  }

  getTipoDocumento(id){
    return this.util.getTipoDocumento(id);
  }

  getTipoTelefono(id){
    return this.util.getTipoTelefono(id);
  }

}







//-----------------------------------------------------------------------------------------------------







@Component({
  selector: 'modal-domicilio',
  templateUrl: 'modal-domicilio.html'
})

export class ModalDomicilio {

  action:null
  zonas;
  domicilio:{
    id:null,
    usuario:null,
    calle: null,
    nro: null,
    zona:null,
    codPostal: null
  };

  constructor(public viewCtrl: ViewController, public params: NavParams, public util: UtilService, public toastCtrl: ToastController, private http: HttpClient) {
    
    
    this.domicilio={
      id:(this.params.get('action') == "editar" || this.params.get('action') == "ver")?   this.params.get('domicilio').id:    null,
      usuario:(this.params.get('action') == "editar" || this.params.get('action') == "ver")?    this.params.get('domicilio').usuario:   this.params.get('user').id,
      calle: (this.params.get('action') == "editar" || this.params.get('action') == "ver")?  this.params.get('domicilio').calle   : null,
      nro: (this.params.get('action') == "editar" || this.params.get('action') == "ver")?  this.params.get('domicilio').nro:  null,
      zona:(this.params.get('action') == "editar" || this.params.get('action') == "ver")? this.params.get('domicilio').zona :null,
      codPostal: (this.params.get('action') == "editar" || this.params.get('action') == "ver")? this.params.get('domicilio').codPostal: null
    }
    
    this.zonas= Config.ZONAS;
    this.action = this.params.get('action');
  }


  actualizarDomicilio(){
    var validacion = this.validateDomicilio();
    if(!(<any>validacion).isValid){
      const toast =this.toastCtrl.create({
        message: (<any>validacion).message,
        duration:3000
      });
      toast.present();
    }
    else{
      if(this.action == "editar"){
        this.updateDomicilio();
      }
      else{
        this.saveDomicilio();
      }
      
    }
    
  }

  validateDomicilio(){
    var result = {isValid:true,message:""};
    
    if( this.util.isEmpty(this.domicilio.calle) ){
      result.isValid = false;
      result.message = "Calle es requerida";
    }
    else if( this.util.isEmpty(this.domicilio.nro) ){
      result.isValid = false;
      result.message = "Número es requerido";
    }
    else if( this.util.isEmpty(this.domicilio.codPostal) ){
      result.isValid = false;
      result.message = "Código Postal es requerido";
    }
    else if( this.util.isEmpty(this.domicilio.zona) ){
      result.isValid = false;
      result.message = "Zona es requerida";
    }
    
    return result;
  }

  updateDomicilio(){
    this.util.showLoading('Actualizando datos...')
    this.putDomicilio()
    .subscribe(
      res => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Dirección actualizada!",
          duration:3000
        });
        toast.present();
        this.viewCtrl.dismiss({success:true});
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al actualizar los datos",
          duration:3000
        });
        toast.present();
      }
    );
  }

  saveDomicilio(){
    this.util.showLoading('Creando datos...')
    this.postDomicilio()
    .subscribe(
      res => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Dirección creada!",
          duration:3000
        });
        toast.present();
        this.viewCtrl.dismiss({success:true});
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al crear los datos",
          duration:3000
        });
        toast.present();
      }
    );
  }

  

  putDomicilio(){
    return this.http.put(Config.heroku_backend_url+'usuarios/'+this.params.get('user').id+"/domicilios/"+this.domicilio.id, this.domicilio);
  }

  postDomicilio(){
    return this.http.post(Config.heroku_backend_url+'usuarios/'+this.params.get('user').id+"/domicilios", this.domicilio);
  }

  

  cerrar(){
    this.viewCtrl.dismiss({success:false});
  }

  

}









//-----------------------------------------------------------------------------------------------


@Component({
  selector: 'modal-usuario',
  templateUrl: 'modal-usuario.html'
})
export class ModalUsuario {

  tipos;
  usuario = {
    id:null,
    email:null,
    documento:null
  };

  constructor(public viewCtrl: ViewController, public params: NavParams, public util: UtilService, public toastCtrl: ToastController, private http: HttpClient) {
    this.tipos = Config.TIPOS_DOCUMENTO;
    this.usuario ={
      id:this.params.get('usuario').id,
      email:this.params.get('usuario').email,
      documento:this.params.get('usuario').documento
    }
  }


  actualizarUsuario(){
    var validacion = this.validateUsuario();
    if(!(<any>validacion).isValid){
      const toast =this.toastCtrl.create({
        message: (<any>validacion).message,
        duration:3000
      });
      toast.present();
    }
    else{
      this.updateUsuario();
    }
    
  }

  validateUsuario(){
    var result = {isValid:true,message:""};
    
    if( this.util.isEmpty(this.usuario.documento) ){
      result.isValid = false;
      result.message = "Dni es requerido";
    }
    
    return result;
  }

  updateUsuario(){
    this.util.showLoading('Actualizando datos...')
    this.putUsuario()
    .subscribe(
      res => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Información actualizada!",
          duration:3000
        });
        toast.present();
        this.params.get('usuario').documento= this.usuario.documento;
        this.viewCtrl.dismiss({success:true});
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al actualizar los datos",
          duration:3000
        });
        toast.present();
      }
    );
  }


  putUsuario(){
    return this.http.put(Config.heroku_backend_url+'usuarios/'+this.usuario.id, {documento:this.usuario.documento, email:this.usuario.email});
  }

  cerrar(){
    this.viewCtrl.dismiss({success:false});
  }


}







//-----------------------------------------------------------------------------------------------


@Component({
  selector: 'modal-telefono',
  templateUrl: 'modal-telefono.html'
})
export class ModalTelefono {

  tipos:any;
  index:any;
  usuario:any;
  action:any;
  
  constructor(public viewCtrl: ViewController, public params: NavParams, public util: UtilService, public toastCtrl: ToastController, private http: HttpClient) {
    
    this.tipos = Config.TIPOS_TELEFONO;
    this.usuario ={
      id: this.params.get('usuario').id,
      email: this.params.get('usuario').email,
      telefonos: this.params.get('usuario').telefonos
    }
    this.index = this.params.get('index');
  }


  actualizarUsuario(index){
    var validacion = this.validateUsuario(index);
    if(!(<any>validacion).isValid){
      const toast =this.toastCtrl.create({
        message: (<any>validacion).message,
        duration:3000
      });
      toast.present();
    }
    else{
      this.updateUsuario();
    }
    
  }

  validateUsuario(index){
    var result = {isValid:true,message:""};
    if( this.util.isEmpty(this.usuario.telefonos[index].tipo) ){
      result.isValid = false;
      result.message = "Tipo es requerido";
    }
    else if( this.util.isEmpty(this.usuario.telefonos[index].numero) ){
      result.isValid = false;
      result.message = "Número es requerido";
    }
    else if( String(this.usuario.telefonos[index].numero).length != this.util.getLongitudTipoTelefono(this.usuario.telefonos[index].tipo) ){
      console.log(String(this.usuario.telefonos[index].numero).length);
      result.isValid = false;
      result.message = "Número debe ser de "+this.util.getLongitudTipoTelefono(this.usuario.telefonos[index].tipo)+" cifras";
    }
    
    return result;
  }

  updateUsuario(){
    this.util.showLoading('Actualizando datos...')
    this.putUsuario()
    .subscribe(
      res => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Información actualizada!",
          duration:3000
        });
        toast.present();
        this.params.get('usuario').telefonos= this.usuario.telefonos;
        this.viewCtrl.dismiss({success:true});
      },
      err => {
        this.util.hideLoading();
        const toast =this.toastCtrl.create({
          message:"Se produjo un error al actualizar los datos",
          duration:3000
        });
        toast.present();
      }
    );
  }


  putUsuario(){
    return this.http.put(Config.heroku_backend_url+'usuarios/'+this.usuario.id, {telefonos:this.usuario.telefonos, email:this.usuario.email});
  }

  cerrar(){
    this.viewCtrl.dismiss({success:false});
  }


}