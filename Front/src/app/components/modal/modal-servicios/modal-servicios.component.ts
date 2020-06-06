import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-servicios',
  templateUrl: './modal-servicios.component.html',
  styleUrls: ['./modal-servicios.component.css']
})
export class ModalServiciosComponent implements OnInit {

  constructor(private servicio: ServiceService, private Location: Location) { }

  ngOnInit() {
  }

  guardarServicio(servicioForm: NgForm):void{
    if(servicioForm.value.servicioId == null){
      //NEW
      
      
      var x = <HTMLInputElement>document.getElementById("imagen");
      var nombreArchivo = x.files[0].name;
      var camino = '../../../assets/servicios/';
      var ruta = camino+nombreArchivo;
      servicioForm.form.value.imagen = ruta;
    
      // console.log(servicioForm.form.value);
      this.servicio.agregarServicio(servicioForm.value).subscribe(servicio => location.reload());
      
      

    }else{
      //UPDATE
      
      var x = <HTMLInputElement>document.getElementById("imagen");
      var nombreArchivo = x.files[0].name;
      var camino = '../../../assets/servicios/';
      var ruta = camino+nombreArchivo;
      servicioForm.form.value.imagen = ruta;
      this.servicio.modificarServicio(servicioForm.value, servicioForm.value.servicioId).subscribe(servicio => location.reload());
       

      

    }

}

}
