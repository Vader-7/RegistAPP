import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registrado: User = null;

  usuario:User={
    name:'',
    lastname:'',
    email:'',
    password:''
  }
  constructor(private storage:Storage, private router:Router  ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log(this.usuario.name);
    this.logear();
    
  }

  async logear()
  {
    this.registrado = await this.storage.get(this.usuario.name);

    if (this.registrado != null)
    {
      if(this.usuario.name == this.registrado.name && this.usuario.password == this.registrado.password)
      {
        console.log("Puede pasar");
        this.storage.set('usuario',this.usuario.name);
        this.router.navigate(['/main']);
      }
      else{
        console.log("Usuario no existe!!!");
      }
    }
    else{
      console.log("Pa la casa por agilao");
    }
  }
}
