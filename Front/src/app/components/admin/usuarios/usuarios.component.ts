import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { personainterface } from 'src/app/models/persona-interface';
import { NgForm } from '@angular/forms';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { AuthService } from 'src/app/services/auth.service';
import $ from 'jquery';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @Input() items: any[] = [];
  personas: any[];
  usuarios: any[];
  rol: number;
  

  constructor(
    private router : Router,
    private servicio: ServiceService, 
    private location: Location,
    private authService : AuthService
    ) { 
    this.user = this.authService.getCurrentUser();
  }
  user: usuariointerface;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.rol = this.user['rol'];

    if(this.rol != 1){
      Swal.fire({
        title: 'Forro',
        text: 'Por que quiere meter tus putas narices aqui, vete a la verga',
        icon: 'question',
        confirmButtonText: 'Decido marcharme'
      })
      this.router.navigate(['/']);

    }

    this.getListaPersonas();
    this.getLista_usuarios();

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

}
