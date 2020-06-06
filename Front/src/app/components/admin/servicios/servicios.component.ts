import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { serviciointerface } from 'src/app/models/servicio-interface';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @Input() items: any[] = [];
  servicios: any[];
  constructor(private servicio: ServiceService, private location: Location) { }

  ngOnInit() {
    this.getListaServicios();
  }

  getListaServicios() {
    this.servicio.obtenerServicios().subscribe((data: any) => {
      this.servicios = data;
      console.log('SERVICIOS');
      console.log(data); 
    });
  }

  deleteServicio(id: string){
    if (confirm("Estas seguro de eliminar?")){
      this.servicio.eliminarServicio(id).subscribe(servicio => location.reload());
    }
  }

  preActualizarServicio(servicio: serviciointerface): void{
    this.servicio.selectedServicio = Object.assign({}, servicio);
    
  }

  resetForm(servicioForm?: NgForm): void{
    this.servicio.selectedServicio = { 
      id: null,
      nombre: '',
      descripcion: '',
      id_plan: '',
      imagen:''
    }
  }

}
