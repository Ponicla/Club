import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { comerciointerface } from '../../models/comercio-interface';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private servicio: ServiceService, private Location: Location) { }

  ngOnInit() {
  }

  guardarComercio(comercioForm: NgForm):void{
    if(comercioForm.value.comercioId == null){
      //NEW
      this.servicio.agregarComercio(comercioForm.value).subscribe(comercio => location.reload());
    }else{
      //UPDATE
      this.servicio.modificarComercio(comercioForm.value, comercioForm.value.comercioId).subscribe(comercio => location.reload());
      

    }

  }

}
