import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
  ) {}

    ngOnInit() {
  }

  register(){
    return window.location.href = '/registro';
  }  
  login() {
    return window.location.href = '/login';
  }
}
