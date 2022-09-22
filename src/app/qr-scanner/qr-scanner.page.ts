import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  codigo: any;
  constructor(private barcodeScanner: BarcodeScanner) { }
  ngOnInit(){

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
