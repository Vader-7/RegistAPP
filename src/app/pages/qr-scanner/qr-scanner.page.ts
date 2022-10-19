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
  nombreCur: string;
  nombreAlumno: string;

  registro: RegistroAsist = {
    nombreCurso: '',
    fecha: null, 
    asistencia: 0,
    seccion: ''
  }
  cursoEstudiante: any [] = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storage: Storage
  ) { }
  ngOnInit(){
    this.storage.get('usuario').then((val) => {
      this.nombreAlumno = val;
      console.log('Your name is', val);
    });
    this.storage.get('registros').then((val) => {
      this.cursoEstudiante = val;
      console.log('Your courses are ', val);
    }
    );
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
  }

  async test(){
    this.nombreCur = 'Programacion';
    console.log(this.cursoEstudiante.length);
    if (this.cursoEstudiante.length == 0){
      this.registro.nombreCurso = this.nombreCur;
      this.registro.seccion = 'A';
      this.registro.fecha = new Date();
      this.registro.asistencia = 1;
      console.log(this.registro);
      this.cursoEstudiante.push(this.registro);
      await this.storage.set('registros', this.cursoEstudiante);
    }else{
      for(let i = 0; i < this.cursoEstudiante.length; i++){
        if(this.cursoEstudiante[i].nombreCurso == this.nombreCur){
          this.cursoEstudiante[i].asistencia++;
          this.cursoEstudiante[i].fecha = new Date();
          console.log("Asistencia registrada");
        }
        else{
          this.registro.nombreCurso = this.nombreCur;
          this.registro.seccion = 'A';
          this.registro.fecha = new Date();
          this.registro.asistencia = 1;
          console.log(this.registro);
          this.cursoEstudiante.push(this.registro);
          await this.storage.set('registros', this.cursoEstudiante);
        }
      }
    }
    console.log(this.cursoEstudiante);
    await this.storage.set('registros', this.cursoEstudiante);
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
