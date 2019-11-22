import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorService } from '../../providers/authenticatorService';
import { Config } from '../../config';


@IonicPage()
@Component({
  selector: 'page-addQualify',
  templateUrl: 'addQualify.html',
})
export class AddQualifyPage {



  constructor() {
  }

  ionViewDidLoad() {}

 }
