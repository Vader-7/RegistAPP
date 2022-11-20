import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizarGuard } from './guards/autorizar.guard';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule), canActivate: [AutorizarGuard]
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule), canActivate: [AutorizarGuard]
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule), canActivate: [AutorizarGuard]
  },
  {
    path: 'clase',
    loadChildren: () => import('./pages/clase/clase.module').then( m => m.ClasePageModule), canActivate: [AutorizarGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./pages/detalle/detalle.module').then( m => m.DetallePageModule), canActivate: [AutorizarGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
