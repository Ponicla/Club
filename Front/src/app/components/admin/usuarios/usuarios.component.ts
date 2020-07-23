import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { personainterface } from 'src/app/models/persona-interface';
import { NgForm } from '@angular/forms';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { AuthService } from 'src/app/services/auth.service';
import $ from 'jquery';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @Input() items: any[] = [];
  personas: any[];
  usuarios: any[];
  usuarios_no: any[];
  usuarios_si: any[] = [];
  paseador_bool: boolean;

  

  constructor(
    private servicio: ServiceService, 
    private location: Location,
    private authService : AuthService
    ) { 
    this.user = this.authService.getCurrentUser();
  }
  user: usuariointerface;

  ngOnInit() {
    this.getListaPersonas();
    this.getLista_usuarios();
    this.obtener_lista_personas_solicitud_paseador();
  }

  getListaPersonas() {
    this.servicio.obtenerPersonas().subscribe((data: any) => {
      this.personas = data; 
    });
  }

  getLista_usuarios() {
    this.servicio.obtener_usuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  obtener_lista_personas_solicitud_paseador(){
    this.servicio.obtener_usuarios().subscribe((data: any) => {
      this.usuarios_no = data; 
      for (let i = 0; i < this.usuarios_no.length; i++) {
        let element = this.usuarios_no[i];
        if(element.paseador == true){
          this.usuarios_si.push(element);
        }
      };
    })

  }

  deletePersona(id: string){
    if (confirm("Estas seguro de eliminar?")){
      this.servicio.eliminarPersona(id).subscribe(persona => location.reload());
    }
  }

  preActualizarPersona(persona: personainterface): void{
    this.servicio.selectedPersona = Object.assign({}, persona);
  }
  
  resetForm(personaForm?: NgForm): void{
    this.servicio.selectedPersona = { 
      
      id: null,
      nombre: '',
      apellido: '',
      dni: '',
      id_gfamiliar: '',
      id_usuario: '',
    }
  }

  alta_paseador(id){
    console.log('ALTA', id);
    this.paseador_bool = true;
    var objeto_booleano_paseador_h = {
      paseador_habilitado: this.paseador_bool
    }
    this.servicio.update_paseador_h(objeto_booleano_paseador_h, id).subscribe();
      
    
  }

  baja_paseador(id){
    console.log('BAJA', id);
    this.paseador_bool = false;
    var objeto_booleano_paseador_h = {
      paseador_habilitado: this.paseador_bool
    }
    this.servicio.update_paseador_h(objeto_booleano_paseador_h, id).subscribe();
    
  }


  

}
