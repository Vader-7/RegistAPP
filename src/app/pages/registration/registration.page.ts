import { User } from './../../interface/user';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  usuario: User = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    
  }
  constructor(private storage: Storage, private router:Router, private menuCtrl: MenuController ) { }

  ngOnInit() { 
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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