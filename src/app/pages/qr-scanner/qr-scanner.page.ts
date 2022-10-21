import { Component, OnInit, SecurityContext } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';
import { Cursos, RegistroAsist } from '../../interface/registro-asist';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  nombreCur: string = '';
  nombreAlumno: string;
  cursoEstudiante: any [] = [];
  
  constructor(
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) { }



  async ngOnInit(){
    await this.storage.get('usuario').then((val) => {
      this.nombreAlumno = val;
    });
    await this.storage.get('registro').then((val) => {
      if (val !== null) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].nombreCurso === undefined) {
            this.storage.remove('registro');
          }
          else{
            this.cursoEstudiante.push(val[i]);
          }
        }
      }
    });
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
  }

  async test(){
    this.nombreCur = Math.round(Math.random() * 10) + '';
    if(this.cursoEstudiante.length === 0){
      let registro: RegistroAsist = {
        nombreCurso: this.nombreCur,
        fecha: new Date(),
        asistencia: 1,
        seccion: 'A'
      }
      this.cursoEstudiante.push(registro);
      await this.storage.set('registro', this.cursoEstudiante);
    }else{
      for(let i = 0; i < this.cursoEstudiante.length; i++){
        if(this.cursoEstudiante[i].nombreCurso == this.nombreCur){
          let fechas = [];
          this.cursoEstudiante[i].asistencia = this.cursoEstudiante[i].asistencia + 1;
          await this.storage.set('registro', this.cursoEstudiante);
          fechas.push(this.cursoEstudiante[i].fecha);
          fechas.push(new Date());
          this.cursoEstudiante[i].fecha = fechas;
          await this.storage.set('registro', this.cursoEstudiante);
          break;
        }else if (this.cursoEstudiante[i].nombreCurso !== this.nombreCur && i === this.cursoEstudiante.length - 1){
          let registro2: RegistroAsist = {
            nombreCurso: this.nombreCur,
            fecha: new Date(),
            asistencia: 1,
            seccion: 'A'
          }
          this.cursoEstudiante.push(registro2);
          await this.storage.set('registro', this.cursoEstudiante);
          break;
        }
      }
    }
    console.log(this.cursoEstudiante);
  }
}
  /*scan() {
    this.barcodeScanner.scan().then(barcodeData => {
    this.storage.set(this.registro.nombreCurso, barcodeData.text);
    this.storage.get(this.registro.nombreCurso).then((val) => {
      let nombre = val;
      console.log('Your class is ', val);
    });
    this.storage.set(this.registro.fecha, new Date().toLocaleString());
    this.storage.set('asistencia', +1);
    this.regis.push(this.registro);
    console.log('Asistencia registrada.');
    this.router.navigate(['/main']);
    for(let i = 0; i < this.regis.length; i++){
      console.log(this.regis[i]);
    }
    }).catch(err => {
      console.log('Error', err);
    });
  }/*/
