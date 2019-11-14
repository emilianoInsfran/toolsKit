import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class UtilService {

    loading=null
    
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
  

  

}