import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-plane',
  templateUrl: './modal-plane.component.html',
  styleUrls: ['./modal-plane.component.css']
})
export class ModalPlaneComponent implements OnInit {

  constructor(private servicio: ServiceService, private Location: Location) { }

  ngOnInit() {
  }

  guardarPlan(planForm: NgForm):void{
    if(planForm.value.planId == null){
      //NEW
      this.servicio.agregarPlan(planForm.value).subscribe(plan => location.reload());
    }else{
      //UPDATE
      this.servicio.modificarPlan(planForm.value, planForm.value.planId).subscribe(plan => location.reload());
      

    }

}
}
