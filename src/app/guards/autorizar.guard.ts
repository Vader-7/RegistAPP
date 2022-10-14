import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizarGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router
    ) {}

  async autorizar() {
    let check = await this.storage.get('usuario');
    if(check != null){
      return true;
    }else{
      this.router.navigate(['/home']);
    }
    return false
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.autorizar();
  }
  
}
