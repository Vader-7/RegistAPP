import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  codigo: any;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private loadingCtrl: LoadingController
    ) { }
  ngOnInit(){

  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
    this.codigo = barcodeData.text;
    console.log('Barcode data', this.codigo);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
