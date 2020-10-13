import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: usuariointerface;
  rol: number;
  servicios_del_usuario: any[];
  cantidad: number;
  paseador : boolean;
  fecha: string;

  constructor(
    private router : Router,
    private authService : AuthService,
    private servicio: ServiceService
    ) { }
    
  public app_name = "Club";

  ngOnInit() {
    this.fecha = null;
    this.paseador = null;
    this.user = this.authService.getCurrentUser();
    this.rol = this.user['rol'];
    this.obtener_servicios_plan_usuario();
    this.es_paseador();
    this.informe_de_vencimiento();
  }

  informe_de_vencimiento(){
    let obj_id_usuario = {
      'id_usuario' : this.user['id_usuario']
    }
    this.servicio.informe_de_vencimiento(obj_id_usuario).subscribe((data : any) => {
      // console.log('informe ', data);
      if(data.length > 0){
        // console.log(data[0]['fecha_baja_plan']);
        let n = new Date(data[0]['fecha_baja_plan']);
        let fechita = n.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: '2-digit' });
        this.fecha = fechita;
      }else{
        console.log('no');
      }

    });
  }

  es_paseador(){
    this.servicio.reporte_dos().subscribe( (data : any) => {
      data.forEach(element => {
        if(element['id_usuario'] == this.user['id_usuario']){
          this.paseador = true;
        }
      });
    })
  }

  onLogout(){
    localStorage.removeItem("currentUser");

    Swal.fire({
      title: 'Adios',
      text: 'Esperamos verte pronto',
      showConfirmButton: false,
      timer: 1500,
    })
      this.router.navigate(['/user/login']);
    
  }

  obtener_servicios_plan_usuario() {
    var objeto_spu = {
      id_usuario: this.user.id_usuario
    }
    this.servicio.servicios_plan_del_usuario(objeto_spu).subscribe((data: any) => {
      this.servicios_del_usuario = data;
      this.cantidad = this.servicios_del_usuario.length;
    });
  
   }
}
