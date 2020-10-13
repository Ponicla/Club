import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Location } from "@angular/common";
import { ServiceService } from "src/app/services/service.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { usuariointerface } from "src/app/models/usuario-interface";
import Swal from "sweetalert2";
import $ from "jquery";

@Component({
  selector: 'app-mis-paseos',
  templateUrl: './mis-paseos.component.html',
  styleUrls: ['./mis-paseos.component.css']
})
export class MisPaseosComponent implements OnInit {

  user: usuariointerface;
/*   paseos_pendientes_usuario: any[]; */
  paseos_del_usuario: any[];
  rol: number;
  paseador : boolean;
  constructor(
    private router2: Router,
    private authService: AuthService,
    private servicio: ServiceService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paseador = null;

    this.user = this.authService.getCurrentUser();
    
    this.rol = this.user['rol'];


    this.servicio.reporte_dos().subscribe( (data : any) => {
      data.forEach(element => {
        if(element['id_usuario'] == this.user['id_usuario']){
          this.paseador = true;
        }
        
      });
      console.log(this.paseador);
        if(this.paseador == null){
          Swal.fire({
            title: 'Forro',
            text: 'Por que quiere meter tus putas narices aqui, vete a la verga',
            icon: 'question',
            confirmButtonText: 'Decido marcharme'
          })
         this.router2.navigate(['/']);
        }else{
          this.user = this.authService.getCurrentUser();
          this.obtener_paseos_pendientes();
        }
    })
    // if(this.rol != 1){
       

    // }

    
  }


  obtener_paseos_pendientes(){
    var objeto_spu = {
      id_paseador: this.user.id_usuario,
    };
    this.servicio.paseos_pendientes_por_paseador(objeto_spu).subscribe((data: any)=>{
      this.paseos_del_usuario = data;
      this.paseos_del_usuario.forEach((element) =>{
        element.fecha = this.transofrmar_fecha(element.fecha);
      })
/*       console.log(this.paseos_del_usuario);
      console.log(this.user.id_usuario); */
    })

  }


  transofrmar_fecha(fecha_recibida) {
    var fs = new Date(fecha_recibida);
    var ds = fs.getDate();
    var ms = fs.getMonth() + 1;
    var ys = fs.getFullYear();
    var fecha_transformada = ds + "-" + ms + "-" + ys;
    return fecha_transformada;
  }

}