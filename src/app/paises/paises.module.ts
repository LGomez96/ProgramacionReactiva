import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesSelectorsComponent } from './pages/paises-selectors/paises-selectors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaisesRoutingModule } from './paises-routing.module';



@NgModule({
  declarations: [
    PaisesSelectorsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaisesRoutingModule,
  ]
})
export class PaisesModule { }
