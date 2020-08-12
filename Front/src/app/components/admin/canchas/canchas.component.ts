import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';
import $ from "jquery";


@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.css']
})
export class CanchasComponent implements OnInit {
  canchas: any[];
  rol: number;
  user: usuariointerface;

  constructor(
    private router : Router,
    private servicio: ServiceService, 
    private location: Location,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
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
    this.obtener_canchas();

    
  }

  cambio_estado(id_estado, id_cancha, evento, id_fila){
    let estado = evento.target.options[evento.target.options.selectedIndex].text;
    // console.log('ID FILA: ', id_fila);
    // console.log('ESTADO: ', estado);
    // console.log('ID ESTADO: ', id_estado);
    // console.log('ID CANCHA: ', id_cancha);
      // console.log('ID ', parseInt(id_estado));
      // console.log('ID CANCHA ', parseInt(id_cancha));

      var objeto_estado_cancha = {
        id_cancha: parseInt(id_cancha),
        estado: parseInt(id_estado)
      }
      // console.log(objeto_estado_cancha);

       this.servicio.actualizar_estado_cancha(objeto_estado_cancha).subscribe(data => {
        let i_f = parseInt(id_fila);                          
        $("#tabla_cancha").find("tr:eq("+i_f+")").find("td:eq(1)").html(estado);
       });
       
  }

  confirmar_cambios(){  
    // $('#e_cancha').empty();
  }

  obtener_canchas(){
    this.servicio.obtener_canchas().subscribe((data: any) => {
      this.canchas = data; 
    });
  }

  agregar_nueva_cancha(){
    console.log($('#nombre_nueva_cancha').val());
    let objeto_nueva_cancha = {
      nombre: $('#nombre_nueva_cancha').val()
    }
      this.servicio.nueva_cancha(objeto_nueva_cancha).subscribe( () => {
        $('#nombre_nueva_cancha').val('');
        Swal.fire({
          title: 'Agregada correctamente',
          showConfirmButton: false,
          timer: 1500,
          icon: 'success'
        });
        location.reload()
      });
  }

  eliminar_cancha(elemento){
    // console.log(elemento.id_cancha);
     this.servicio.eliminar_cancha(elemento.id_cancha).subscribe(() => {
       location.reload()
     });
  }
}
