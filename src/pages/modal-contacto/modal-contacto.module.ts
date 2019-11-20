import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContactoPage } from './modal-contacto';

@NgModule({
  declarations: [
    ModalContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalContactoPage),
  ],
})
export class ModalContactoPageModule {}
