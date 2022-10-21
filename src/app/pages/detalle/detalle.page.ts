import { Component, OnInit } from '@angular/core';
import { RegistrosFec } from 'src/app/interface/registro-asist';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';


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
  
  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {   
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.fechas.nombreCurso = this.router.getCurrentNavigation().extras.state.id;
        console.log(this.fechas.nombreCurso);
      }
    })
  };

  async ngOnInit() {
    this.storage.get('registro').then((val) => {
      for (let i = 0; i < val.length; i++) {
        if (val[i].nombreCurso === this.fechas.nombreCurso) {
          this.fechas.fecha = val[i].fecha;
          console.log(this.fechas.fecha);
        }
      }
    });
  }
}
