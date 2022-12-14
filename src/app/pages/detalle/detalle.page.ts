import { Component, OnInit } from '@angular/core';
import { RegistrosFec } from 'src/app/interface/registro-asist';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  fechas: RegistrosFec = {
    nombreCurso: '',
    fecha: []
  }
  fecha: any;
  asistencia: number;
  progreso: number;
  nombreAlumno: any;


  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private menuCtrl: MenuController) {
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.fechas.nombreCurso = this.router.getCurrentNavigation().extras.state.id;
        console.log(this.fechas.nombreCurso);
      }
    })
  };
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  async ngOnInit() {
    await this.storage.get('activeUser').then((val) => {
      this.nombreAlumno = val;
    });
    this.storage.get(this.nombreAlumno).then((val) => {
      val.cursos.forEach(element => {
        if(element.nombreCurso == this.fechas.nombreCurso) {
          element.fecha.forEach(x => {
            console.log(x);
            this.fecha = x.toLocaleString();
            this.fechas.fecha.push(this.fecha);
          });
          this.asistencia = element.asistencia;
          this.progreso = Math.round((this.asistencia / 10) * 100);
          console.log(this.progreso);
        }
      });
      var elem = document.getElementById("myBar");
      elem.style.width = this.progreso + "%";
    });
  }
}
