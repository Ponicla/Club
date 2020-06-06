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

  /* info(){
    // var files = event.target.files;
    var x = <HTMLInputElement>document.getElementById("file");
    console.log(x.files[0].name);
  } */

  guardarPlan(planForm: NgForm):void{
    if(planForm.value.planId == null){
      //NEW
      
      /* var files = event.target.files; */
      var x = <HTMLInputElement>document.getElementById("imagen");
      var nombreArchivo = x.files[0].name;
      var camino = '../../../assets/';
      var ruta = camino+nombreArchivo;
      planForm.form.value.imagen = ruta;
    
      console.log(planForm.form.value);
      this.servicio.agregarPlan(planForm.value).subscribe(plan => location.reload());
      
    }else{
      //UPDATE
      /* var files = event.target.files; */
      var x = <HTMLInputElement>document.getElementById("imagen");
      var nombreArchivo = x.files[0].name;
      var camino = '../../../assets/';
      var ruta = camino+nombreArchivo;
      planForm.form.value.imagen = ruta;
      console.log(planForm.form.value);
      this.servicio.modificarPlan(planForm.value, planForm.value.planId).subscribe(plan => location.reload());
      

    }

}
}
