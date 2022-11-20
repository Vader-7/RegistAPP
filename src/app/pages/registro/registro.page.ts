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
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  async onSubmit() {
    console.log(this.usuario);
    await this.guardar();
  }

  async guardar() {
    let usr = await this.storage.get(this.usuario.name);
    if (usr == null) {
      await this.usuarios.push(this.usuario);
      await this.storage.set('usuarios', this.usuarios);
      this.router.navigate(['/login']);
    }
  }

}