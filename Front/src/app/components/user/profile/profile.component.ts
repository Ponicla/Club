import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre:string;
  apellido:string;
  dni:string;
  id_gfamiliar:string;
  id_usuario:string;
  controlador:any;
  personaParaEnviar: any;
  user: usuariointerface;
  persona: boolean;
  paseador_bool: boolean;

  constructor(
    private authService : AuthService,
    private servicio: ServiceService
    ) { }  

  ngOnInit() {
    this.persona = false;
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
    
    
    this.servicio.obtenerPersonaById(this.user.id_usuario).subscribe(data  =>  {  
      console.log(data);
      this.controlador = data;

      if(this.controlador == ''){
        this.persona = false;
      }else{
        this.persona = true;
      }  
    })

    this.servicio.get_estado_paseador(this.user.id_usuario).subscribe(data  =>  {  
      var e_p = data[0].paseador;
      if (e_p === true){
        $('#check_paseador').prop('checked', true);
      }else{
        $('#check_paseador').prop('checked', false);
      }
    });

    
      

    
   
 } 
  

  getUser(){
    this.user = this.authService.getCurrentUser();
  }
  
  obtenerPersonaPorId(id){
  }

  guardar(apellido: string){
    // personaForm.value.id_usuario = this.user.id_usuario;
    //this.personaParaEnviar = personaForm.value;
    this.nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    this.apellido = (<HTMLInputElement>document.getElementById("apellido")).value;
    this.id_gfamiliar = (<HTMLInputElement>document.getElementById("id_gfamiliar")).value;
    this.id_usuario = (<HTMLInputElement>document.getElementById("id_usuario")).value;
    this.dni = (<HTMLInputElement>document.getElementById("dni")).value;

    this.personaParaEnviar = {
      nombre: this.nombre, 
      apellido: this.apellido,
      id_usuario: this.id_usuario,
      id_gfamiliar: this.id_gfamiliar,
      dni: this.dni
    }

    this.servicio.agregarPersona(this.personaParaEnviar).subscribe(persona => location.reload());
  }

  estado_como_paseador(){
    this.user = this.authService.getCurrentUser();
    
    if ($('#check_paseador:checked').val() === undefined){
      this.paseador_bool = false;
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Usted a dejado de ser paseador',
        showConfirmButton: false,
        timer: 1500
      })
      
    }else{
      this.paseador_bool = true;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Enviaste una solicitud para ser paseador',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    var objeto_booleano_paseador = {
      paseador: this.paseador_bool
    }
    this.servicio.update_paseador(objeto_booleano_paseador, this.user.id_usuario).subscribe();


    
  }

}
