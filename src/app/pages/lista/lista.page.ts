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
  listadoAsignaturas: RegistroAsist [] = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getValues();
  }

  async getValues() {
    await this.storage.get('registros').then((val) => {
      this.listadoAsignaturas = val;
    }
    );
    console.log(this.listadoAsignaturas);
  }
}
