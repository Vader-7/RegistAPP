import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  username: string;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { 
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.activatedRouter = this.router.getCurrentNavigation().extras.state.usuario;
        let data = this.router.getCurrentNavigation().extras.state.usuario;
        console.log(data);
        this.username = data.username;
      }
    });
  } 

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
