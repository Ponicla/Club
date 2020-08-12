import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-new-useradmin',
  templateUrl: './modal-new-useradmin.component.html',
  styleUrls: ['./modal-new-useradmin.component.css']
})
export class ModalNewUseradminComponent implements OnInit {

  constructor(
    private servicio: ServiceService, 
    private location: Location

  ) { }

  ngOnInit(): void {
  }


  alta_usuario_admin(usuaroadminForm: NgForm):void{
    
    if(usuaroadminForm.value.id_usuario == null){
      this.servicio.create_usuario_admin(usuaroadminForm.value).subscribe(user_admin => location.reload());
      console.log(usuaroadminForm.value);
    }else{
      //ACTUALIZAR
      // this.servicio.modificarPersona(usuaroadminForm.value, usuaroadminForm.value.personaId).subscribe(persona => location.reload());
    }
  }

}
