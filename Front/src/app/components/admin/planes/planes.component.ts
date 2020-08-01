import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { planinterface } from 'src/app/models/plan-interface';
import { NgForm } from '@angular/forms';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  @Input() items: any[] = [];
  planes: any[];
  
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
    
    this.getListaPlanes();
  }

  getListaPlanes() {
    this.servicio.obtenerPlanes().subscribe((data: any) => {
      this.planes = data;
      //console.log(data); 
    });
  }

  deletePlan(id: string){
    if (confirm("Estas seguro de eliminar?")){
      this.servicio.eliminarPlan(id).subscribe(plan => location.reload());
    }
  }

  preActualizarPlan(plan: planinterface): void{
    this.servicio.selectedPlan = Object.assign({}, plan);
    
  }

  resetForm(planForm?: NgForm): void{
    this.servicio.selectedPlan = { 
      id: null,
      nombre: '',
      descripcion: '',
      costo: '',
      imagen:''
    }
  }

}
