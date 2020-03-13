import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { personainterface } from '../../../models/persona-interface';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-nueva-persona',
  templateUrl: './modal-nueva-persona.component.html',
  styleUrls: ['./modal-nueva-persona.component.css']
})
export class ModalNuevaPersonaComponent implements OnInit {

  constructor(private servicio: ServiceService, private location: Location) { }

  ngOnInit() {
  }

  guardarPersona(personaForm: NgForm):void {
    if(personaForm.value.personaId == null){
      this.servicio.agregarPersona(personaForm.value).subscribe(persona => location.reload());
      console.log(personaForm.value);
    }else{
      //ACTUALIZAR
      this.servicio.modificarPersona(personaForm.value, personaForm.value.personaId).subscribe(persona => location.reload());
    }
  }
}
