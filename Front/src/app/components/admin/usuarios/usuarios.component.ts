import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { personainterface } from 'src/app/models/persona-interface';
import { NgForm } from '@angular/forms';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @Input() items: any[] = [];
  personas: any[];

  constructor(private servicio: ServiceService, private location: Location,
    private authService : AuthService) { 
    this.user = this.authService.getCurrentUser();
  }
  user: usuariointerface;

  ngOnInit() {
    this.getListaPersonas()
  }

  getListaPersonas() {
    this.servicio.obtenerPersonas().subscribe((data: any) => {
      this.personas = data;
      // console.log(data); 
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
