import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage, ModalDomicilio } from './user';

@NgModule({
  declarations: [
    UserPage,
    ModalDomicilio
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    IonicPageModule.forChild(ModalDomicilio)
  ],
})
export class UserPageModule {}
