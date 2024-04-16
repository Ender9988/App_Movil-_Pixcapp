import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HumedadPage } from './humedad.page';

const routes: Routes = [
  {
    path: '',
    component: HumedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumedadPageRoutingModule {}
