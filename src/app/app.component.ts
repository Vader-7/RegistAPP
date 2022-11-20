import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { NgForm }   from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private menuCtrl: MenuController,
    private storage: Storage
  ) {}
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  async ngOnInit() {
    // If using a custom driver:
    //await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }
  closeMenu() {
    this.menuCtrl.close('first');
  }
  logout() {
    this.storage.set('auth', false);
    this.menuCtrl.close('first');
    return window.location.href = '/home';
  }
}
