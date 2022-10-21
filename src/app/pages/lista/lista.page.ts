import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';
import { RegistroAsist, RegistrosFec } from '../../interface/registro-asist';
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
        if(element.fecha instanceof Array){
          //get the last element of the array
          element.fecha = element.fecha[element.fecha.length - 1];
          element.fecha = element.fecha.toDateString();
        }
        else{
          element.fecha = element.fecha.toDateString();
        }
      });
    });
  }
  //give the name of the course to the next page
  async goToDetail(id: string){
    //navigation extras
    this.router.navigate(['/detalle'], {state: {id: id}});
  }
}


  