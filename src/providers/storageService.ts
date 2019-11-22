import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class storageService {

    constructor( private platform: Platform, private storage: Storage) {

    }


    getUser(){
        this.storage.get('backend_user')
    }
  

  

}