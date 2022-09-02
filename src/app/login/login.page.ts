import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
  constructor(private router: Router) { }
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
  ngOnInit() {
  }
}
