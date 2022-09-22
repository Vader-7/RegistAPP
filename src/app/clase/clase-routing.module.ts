import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasePage } from './clase.page';

const routes: Routes = [
  {
    path: '',
    component: ClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasePageRoutingModule {}
