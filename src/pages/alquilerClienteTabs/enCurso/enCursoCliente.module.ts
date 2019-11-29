import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnCursoClientePage } from './enCursoCliente';

@NgModule({
  declarations: [
    EnCursoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(EnCursoClientePage),
  ],
})
export class EnCursoClientePageModule {}
