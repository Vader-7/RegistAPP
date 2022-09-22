import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    username: '',
    password: ''
  }
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
    ) {}
  onSubmit() {
    if(this.user.username === 'admin' && this.user.password === 'admin') {
      console.log('Welcome');
      let navigationExtras:NavigationExtras = {
        state: {
          usuario: this.user
    }
  }
  this.router.navigate(['main'], navigationExtras);
  console.log(navigationExtras);
}
    else {
      console.log('Invalid');
    }
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
  }
  ngOnInit() {
  }
}
