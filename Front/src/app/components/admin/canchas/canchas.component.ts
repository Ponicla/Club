import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';


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

  obtener_canchas(){
    this.servicio.obtener_canchas().subscribe((data: any) => {
      this.canchas = data; 
    });
  }
}
