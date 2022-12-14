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
  nombreAlumno: any;


  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.getValues();
  }

  async getValues() {
    await this.storage.get('activeUser').then((val) => {
      this.nombreAlumno = val;
    });
    await this.storage.get(this.nombreAlumno).then((val) => {
      val.cursos.forEach(element => {
        element.fecha = element.fecha[element.fecha.length - 1];
        element.fecha = element.fecha.toLocaleString('default', { month: 'long' }) + " " + element.fecha.getDate();
        this.listadoAsignaturas.push(element);
        //order by the last letter of the name of the course
        this.listadoAsignaturas.sort((a, b) => {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
            }
          );
        }
      );
      console.log(this.listadoAsignaturas);
    });
  }
  /*
  
      this.listadoAsignaturas = val[0].cursos;
      console.log(this.listadoAsignaturas);
      this.listadoAsignaturas.forEach(element => {
        if(element.fecha instanceof Array){
          //get the last element of the array
          element.fecha = element.fecha[element.fecha.length - 1];
          element.fecha = element.fecha.toLocaleString('default', { month: 'long' }) + " " + element.fecha.getDate();
        }
      });
    });
  }*/
  //give the name of the course to the next page
  async goToDetail(id: string){
    //navigation extras
    this.router.navigate(['/detalle'], {state: {id: id}});
  }
}


  