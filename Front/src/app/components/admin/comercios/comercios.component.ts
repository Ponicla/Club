import { Component, OnInit } from '@angular/core';
import { comerciointerface } from 'src/app/models/comercio-interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.css']
})
export class ComerciosComponent implements OnInit {
  comercios: any[];

  constructor(
    private servicio: ServiceService, 
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getListaComercios();
  }

  getListaComercios() {
    this.servicio.obtenerTodos().subscribe((data: any) => {
      this.comercios = data;
    });
  }

  deleteComercio(id: string) {
    if (confirm("Estas seguro de eliminar?")) {
      this.servicio.eliminarComercio(id).subscribe(persona => location.reload());
    }
  }

  preActualizarComercio(comercio: comerciointerface): void{
    this.servicio.selectedComercio = Object.assign({}, comercio);
  }

  resetForm(comercioForm?: NgForm): void{
    this.servicio.selectedComercio ={
      id: null,
      nombre: '',
      descuento: ''
    }
  }

}
