import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendienteClientePage } from './pendienteCliente';

@NgModule({
  declarations: [
    PendienteClientePage,
  ],
  imports: [
    IonicPageModule.forChild(PendienteClientePage),
  ],
})
export class PendienteClientePageModule {}
