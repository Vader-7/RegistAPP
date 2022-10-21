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
  constructor(private storage: Storage, 
    private router:Router,
    private menuCtrl: MenuController) {
      this.menuCtrl.enable(false);
     }

  ngOnInit() { 
  }


  onSubmit() {
    console.log(this.usuario);
    this.guardar();
  }

  async guardar() {
    let usr = await this.storage.get(this.usuario.name);

    if (usr == null) {
      await this.storage.set(this.usuario.name, this.usuario);
      console.log("Usuario registrado");
      this.router.navigate(['/login']);
      
    }
    else{
      console.log("Usuario ya existe");
    }
  }

}