import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  username: string;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private menuCtrl: MenuController
  ) { 
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.activatedRouter = this.router.getCurrentNavigation().extras.state.usuario;
        let data = this.router.getCurrentNavigation().extras.state.usuario;
        console.log(data);
        this.username = data.username;
      }
    })
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
  ngOnInit() {
  }

}
