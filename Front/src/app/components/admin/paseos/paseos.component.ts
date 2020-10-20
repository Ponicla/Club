import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';
import $ from "jquery";

@Component({
  selector: 'app-paseos',
  templateUrl: './paseos.component.html',
  styleUrls: ['./paseos.component.css']
})
export class PaseosComponent implements OnInit {
  user: usuariointerface;
  paseador_bool: boolean;
  rol: number;
  usuarios: any[];
  usuarios_no: any[];
  usuarios_si: any[] = [];
  
  constructor(private router : Router,
    private servicio: ServiceService, 
    private location: Location,
    private authService : AuthService
    ) { 
    this.user = this.authService.getCurrentUser();
  }
  

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.rol = this.user['rol'];

    if(this.rol != 1){
      Swal.fire({
        title: 'Epa',
        text: 'Por que quiere meter tus putas narices aqui, vete a la verga',
        icon: 'question',
        confirmButtonText: 'Decido marcharme'
      })
      this.router.navigate(['/']);

    }

    this.getLista_usuarios();
    this.obtener_lista_personas_solicitud_paseador();
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


  alta_paseador(id, id_fila){
    console.log('ALTA', id);
    this.paseador_bool = true;
    var objeto_booleano_paseador_h = {
      paseador_habilitado: this.paseador_bool
    }
    this.servicio.update_paseador_h(objeto_booleano_paseador_h, id).subscribe(() => {
      let i_f = parseInt(id_fila);                          
      $("#tabla_paseadores").find("tr:eq("+i_f+")").find("td:eq(2)").html('<p style="color:green">Paseador activo<p>');
    });
      
    
  }

  baja_paseador(id, id_fila){
    console.log('BAJA', id);
    this.paseador_bool = false; 
    var objeto_booleano_paseador_h = {
      paseador_habilitado: this.paseador_bool
    }
    this.servicio.update_paseador_h(objeto_booleano_paseador_h, id).subscribe( () => {
      let i_f = parseInt(id_fila);                          
      $("#tabla_paseadores").find("tr:eq("+i_f+")").find("td:eq(2)").html('<p style="color:red">No es paseador<p>');
    });
    
  }

}
