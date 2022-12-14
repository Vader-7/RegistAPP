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
    await this.getValues();
  }
  async getValues() {
    await this.storage.get('users').then((val) => {
      if(val instanceof Array){
        for(let i = 0; i < val.length; i++){
          if(val[i].email == this.usuario.email){
            this.usuario = val[i];
            //send email with the password
            console.log('Correo enviado');
          }
          else{
            console.log('Correo no registrado');
          }
        }
      }else{
        alert("El usuario no existe");
      }
    });
  }
}
