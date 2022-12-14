import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { User } from './../../interface/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: User = {
    name: '',
    lastname: '',
    email: '',
    password: '',
  }
  usuarios: any[] = [];

  constructor(private storage: Storage, 
    private router:Router,
    private menuCtrl: MenuController) {
     }

  ngOnInit() { 
    this.getValues();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  async onSubmit() {
    console.log(this.usuario);
    await this.guardar();
  }

  //obtener los datos del storage
  async getValues() {
    await this.storage.get('users').then((val) => {
      this.usuarios = val;
    });
  }
  //guardar los datos en el storage
  async guardar() {
    await this.getValues();
    if (this.usuarios instanceof Array) {
      //validate if the user already exists
      if (this.usuarios.find((user) => user.name === this.usuario.name)) {
        alert('El usuario ya existe');
      //validate via regex if the name is valid
      } else if (!this.usuario.name.match(/^[a-zA-Z]+$/)) {
        alert('El nombre no es válido');
      //validate via regex if the lastname is valid
      } else if (!this.usuario.lastname.match(/^[a-zA-Z]+$/)) {
        alert('El apellido no es válido');
      //validate if the email already exists
      } else if (this.usuarios.find((user) => user.email === this.usuario.email)) {
        alert('El email ya existe');
      //add regex to validate the email
      } else if (!this.usuario.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
        alert('El email no es válido');
      //add regex to validate the password
      } else if (!this.usuario.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
      } else {
        this.usuarios.push(this.usuario);
        this.storage.set('users', this.usuarios);
        this.router.navigate(['/login']);
      }
    } else {
      this.usuarios = [];
      this.usuarios.push(this.usuario);
      this.storage.set('users', this.usuarios);
      this.router.navigate(['/login']);
    }
  }
}