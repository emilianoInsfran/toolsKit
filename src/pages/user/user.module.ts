import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage, ModalDomicilio , ModalUsuario, ModalTelefono} from './user';

@NgModule({
  declarations: [
    UserPage,
    ModalDomicilio,
    ModalUsuario, 
    ModalTelefono
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    IonicPageModule.forChild(ModalDomicilio),
    IonicPageModule.forChild(ModalUsuario),
    IonicPageModule.forChild(ModalTelefono)
  ],
})
export class UserPageModule {}
