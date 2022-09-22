import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menuCtrl: MenuController
  ) {}
  closeMenu() {
    this.menuCtrl.close('first');
  }
  logout() {
    this.menuCtrl.close('first');
    return window.location.href = '/home';
  }
}
