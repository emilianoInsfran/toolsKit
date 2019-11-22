import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Config } from '../config';


@Injectable()
export class UtilService {

    loading=null
    tipoDocumentos;
    tipoTelefonos;
    
    constructor(public loadingCtrl: LoadingController) {

    }

    isEmpty(obj){
        if(obj == undefined || obj == null || String(obj).trim().length == 0 ){
            return true;
        }
        return false;
    }

    showLoading(messagge){
        this.loading = this.loadingCtrl.create({
            content: messagge
        });
        this.loading.present();
    }

    hideLoading(){
        this.loading.dismiss();
    }

    getTipoDocumento(id){
        var descripcion="";
        this.tipoDocumentos = Config.TIPOS_DOCUMENTO;
        for(var i=0; i< this.tipoDocumentos.length; i++){
            if(this.tipoDocumentos[i].id == id){
                descripcion = this.tipoDocumentos[i].descripcion;
                break;
            }
        }
        return descripcion;
    }

    getTipoTelefono(id){
        var descripcion="";
        this.tipoTelefonos = Config.TIPOS_TELEFONO;
        for(var i=0; i< this.tipoTelefonos.length; i++){
            if(this.tipoTelefonos[i].id == id){
                descripcion = this.tipoTelefonos[i].descripcion;
                break;
            }
        }
        return descripcion;
    }

    getLongitudTipoTelefono(id){
        var longitud=0;
        this.tipoTelefonos = Config.TIPOS_TELEFONO;
        for(var i=0; i< this.tipoTelefonos.length; i++){
            if(this.tipoTelefonos[i].id == id){
                longitud = this.tipoTelefonos[i].longitud;
                break;
            }
        }
        return longitud;
    }
  

  

}