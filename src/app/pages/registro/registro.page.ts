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
  user: User = {
    name: '',
    lastname: '',
    email: '',
    password: '',
  }

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
      //validar si el usuario ya existe
      if (this.usuarios.find((user) => user.name === this.usuario.name)) {
        alert('El usuario ya existe');
      } else {
      this.usuarios.push(this.usuario);
      this.storage.set('users', this.usuarios);
      }
    } else {
      this.usuarios = [];
      this.usuarios.push(this.usuario);
      this.storage.set('users', this.usuarios);
    }
    this.router.navigate(['/login']);
  }
}