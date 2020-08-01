import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { serviciointerface } from 'src/app/models/servicio-interface';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @Input() items: any[] = [];
  servicios: any[];
  rol: number;
  user: usuariointerface;

  constructor(
    private router : Router,
    private servicio: ServiceService, 
    private location: Location,
    private authService : AuthService
    ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.rol = this.user['rol'];

    if(this.rol != 1){
      Swal.fire({
        title: 'Forro',
        text: 'Por que quiere meter tus putas narices aqui, vete a la verga',
        icon: 'question',
        confirmButtonText: 'Decido marcharme'
      })
      this.router.navigate(['/']);
    }
    
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
