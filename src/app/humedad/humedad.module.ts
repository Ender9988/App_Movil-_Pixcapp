import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HumedadPageRoutingModule } from './humedad-routing.module';
import { HumedadPage } from './humedad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HumedadPageRoutingModule
  ],
  declarations: [
    HumedadPage,
    
  ]
})
export class HumedadPageModule {}
