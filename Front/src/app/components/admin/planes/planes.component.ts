import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { planinterface } from 'src/app/models/plan-interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  @Input() items: any[] = [];
  planes: any[];
  constructor(private servicio: ServiceService, private location: Location) { }

  ngOnInit() {
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
      costo: '' 
    }
  }

}
