import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../../interface/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  nombre: any;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private menuCtrl: MenuController,
    private storage: Storage
  ) { 
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nombre = this.router.getCurrentNavigation().extras.state.user;
        this.storage.set('activeUser', this.nombre);
      }
    })
  };
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/home']);

  }
  openMenu() {
    this.menuCtrl.open('first');
  }
  closeMenu() {
    this.menuCtrl.close('first');
  }
  
} 

