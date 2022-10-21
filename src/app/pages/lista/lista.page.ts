import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';
import { RegistroAsist } from '../../interface/registro-asist';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  listadoAsignaturas: any [] = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getValues();
  }

  async getValues() {
    await this.storage.get('registro').then((val) => {
      this.listadoAsignaturas = val;
      console.log(this.listadoAsignaturas);
      this.listadoAsignaturas.forEach(element => {
          element.fecha = element.fecha.toLocaleString('default', ' ' + { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' } + ' ');
        });
    });
  }
}


  