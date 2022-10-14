import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  isModalOpen = false;
  list: any = [];
  list1: any = [];
  fecha: string;
  constructor() { }

  ngOnInit() {
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  agregarClase() {
    this.fecha = new Date().toISOString();
    this.list.push(this.fecha);
    this.list1.push(this.fecha);
    this.fecha = "";
  }
}
