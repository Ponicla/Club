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
      let objeto_contratar = {
        id_plan: plan_recuperado,
        id_usuario: this.user.id_usuario,
      };
    this.servicio.contratar_plan(objeto_contratar).subscribe();
    localStorage.removeItem("reset_id_plan");
  }
}
