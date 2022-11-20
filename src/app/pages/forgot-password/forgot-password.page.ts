import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  correo: User["email"] = null;

  usuario: User = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    
  }
  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private storage: Storage
    ) { }
   

  async ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  async onSubmit(){
    //check if email is valid
    this.correo = await this.usuario.email;
    if(this.correo != null){
      console.log("Correo valido");
      //send email with password

    }
    else{
      console.log("Correo no valido");
    }
  }
}
