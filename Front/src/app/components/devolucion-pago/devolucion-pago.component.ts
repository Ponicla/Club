import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ServiceService } from "src/app/services/service.service";
import { usuariointerface } from "src/app/models/usuario-interface";

@Component({
  selector: "app-devolucion-pago",
  templateUrl: "./devolucion-pago.component.html",
  styleUrls: ["./devolucion-pago.component.css"],
})
export class DevolucionPagoComponent implements OnInit {
  user: usuariointerface;
  plan: any = {};
  constructor(
    private authService: AuthService,
    private servicio: ServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    var plan_recuperado = localStorage.getItem("reset_id_plan");

    var fh = new Date();
    var dh = fh.getDate();
    var mh = fh.getMonth()+1;
    var yh = fh.getFullYear();
    var fecha_hoy  = yh + "-" + mh + "-" + dh;

    var fs = new Date();
    var dias = 31; 
    fs.setDate(fs.getDate() + dias);
    var ds = fs.getDate();
    var ms = fs.getMonth()+1;
    var ys = fs.getFullYear();
    var fecha_fin  = ys+"-"+ ms+"-"+ ds;

    var fs = new Date();
    var dias = 28; 
    fs.setDate(fs.getDate() + dias);
    var ds = fs.getDate();
    var ms = fs.getMonth()+1;
    var ys = fs.getFullYear();
    var fecha_aviso  = ys+"-"+ ms+"-"+ ds;

    var fs = new Date();
    var dias = 30; 
    fs.setDate(fs.getDate() + dias);
    var ds = fs.getDate();
    var ms = fs.getMonth()+1;
    var ys = fs.getFullYear();
    var fecha_ultimo_aviso  = ys+"-"+ ms+"-"+ ds;

    var fs = new Date();
    var dias = 32; 
    fs.setDate(fs.getDate() + dias);
    var ds = fs.getDate();
    var ms = fs.getMonth()+1;
    var ys = fs.getFullYear();
    var fecha_baja  = ys+"-"+ ms+"-"+ ds;


      let objeto_contratar = {
        id_plan: plan_recuperado,
        id_usuario: this.user.id_usuario,
        fecha_inicio_plan: fecha_hoy.toString(),
        fecha_fin_plan: fecha_fin.toString(),
        fecha_aviso_plan: fecha_aviso.toString(),
        fecha_ultimo_aviso_plan: fecha_ultimo_aviso.toString(),
        fecha_baja_plan: fecha_baja.toString()

      };
    this.servicio.contratar_plan(objeto_contratar).subscribe();


    
    var user = this.authService.getCurrentUser();
    user.id_plan = plan_recuperado;

    localStorage.removeItem("currentUser");
    localStorage.setItem("currentUser",JSON.stringify(user));
    localStorage.removeItem("reset_id_plan");
  }
}
