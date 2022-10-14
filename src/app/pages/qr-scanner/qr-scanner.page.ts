import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';
import { RegistroAsist, Registros } from '../../interface/registro-asist';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  regis: Registros[] = [];
  nombreAlumno: string;
  nombreCur: string;

  registro: RegistroAsist = {
    nombreCurso: '',
    fecha: '',
    asistencia: ''
  }

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
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
  }

  async test(){
    await this.storage.set(this.registro.nombreCurso, 'xd');
    this.nombreCur = await this.storage.get(this.registro.nombreCurso);
    console.log(this.nombreCur);
    await this.storage.set(this.registro.fecha, new Date().toLocaleString());
    await this.storage.set(this.registro.asistencia, 'hola');
    console.log('Asistencia registrada.');
    for(let i = 0; i < 3; i++){
      this.regis.push({
        registros: [{
          nombreCurso: await this.storage.get(this.registro.nombreCurso),
          fecha: await this.storage.get(this.registro.fecha),
          asistencia: await this.storage.get(this.registro.asistencia)
        }]
      });
    }
    this.storage.set('registros', this.regis);
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
