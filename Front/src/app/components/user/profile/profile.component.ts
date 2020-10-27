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
  telefono: string;

  fecha_vencimiento_plan: string;
  fecha_contratacion_plan: string;
  nombre_plan: string;
  precio_plan : string;



  constructor(
    private authService : AuthService,
    private servicio: ServiceService
    ) { }  

  ngOnInit() {
    this.persona = false;
    this.user = this.authService.getCurrentUser();
    /* console.log(this.user); */
    let objet_plan_perfil = {
      "id_usuario" : this.user.id_usuario
    }

    this.servicio.plan_para_perfil(objet_plan_perfil).subscribe( (data_8 : any ) => {
      // console.log(data_8); 
      if(data_8.length > 0){

        let n1 = new Date(data_8[0]['fecha_fin_plan']);
        let fechita1 = n1.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: '2-digit' });
       

        let n2 = new Date(data_8[0]['fecha_inicio_plan']);
        let fechita2 = n2.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: '2-digit' });


        this.fecha_vencimiento_plan = fechita1;
        this.fecha_contratacion_plan = fechita2;
        this.nombre_plan = data_8[0]['nombre'];
        this.precio_plan = data_8[0]['costo'];
      }else{
        this.fecha_vencimiento_plan = '';
        this.fecha_contratacion_plan = '';
        this.nombre_plan = 'No registra plan actualmente';
        this.precio_plan = '';
      }
    });
    
    
    this.servicio.obtenerPersonaById(this.user.id_usuario).subscribe(data  =>  {  
      // console.log(data);
      this.controlador = data;

      if(this.controlador == ''){
        this.persona = false;
      }else{
        this.persona = true;
      }  
    })

    this.servicio.get_estado_paseador(this.user.id_usuario).subscribe(data  =>  {  
      var e_p = data[0].paseador;
      // console.log('ESTADO PASEADOR ', e_p);
      if (e_p == true){
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
    this.telefono = (<HTMLInputElement>document.getElementById("telefono")).value;

    this.personaParaEnviar = {
      nombre: this.nombre, 
      apellido: this.apellido,
      id_usuario: this.id_usuario,
      id_gfamiliar: this.id_gfamiliar,
      dni: this.dni,
      telefono: this.telefono
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

    var obj_id_user = {
      "id_usuario" : this.user.id_usuario
    }
    

    this.servicio.verifacar_ratoneada_paseador(obj_id_user).subscribe((data : any) => {
      console.log(data.length);
      if(data.length > 0){
        Swal.fire({
          icon: 'error',
          title: 'ALTO RATA INMUNDA',
          text: 'Tienes paseos activos, no puedes darte de baja ahora'
        });    
      }else{
        var objeto_booleano_paseador = {
          paseador: this.paseador_bool
        }
        this.servicio.update_paseador(objeto_booleano_paseador, this.user.id_usuario).subscribe();
      }
    });



    


    
  }

}
