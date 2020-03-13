import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { usuariointerface } from '../../models/usuario-interface';
import { Location } from '@angular/common';
import { comerciointerface } from 'src/app/models/comercio-interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() items: any[] = [];

  comercios: any[];
  constructor(private servicio: ServiceService, private location: Location) { }

  ngOnInit() {
    this.getListaComercios();
  }

  getListaComercios() {
    this.servicio.obtenerTodos().subscribe((data: any) => {
      this.comercios = data;
      // console.log(data);
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





