import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Location } from "@angular/common";
import { ServiceService } from "src/app/services/service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { usuariointerface } from "src/app/models/usuario-interface";
import Swal from "sweetalert2";
import $ from "jquery";

@Component({
  selector: "app-mis-servicios",
  templateUrl: "./mis-servicios.component.html",
  styleUrls: ["./mis-servicios.component.css"],
})
export class MisServiciosComponent implements OnInit {
  servicios_del_usuario: any[];
  user: usuariointerface;
  servicios_cancha: any[] = [];
  servicios_paseo: any[] = [];
  cantidad: number;

  constructor(
    private router2: Router,
    private authService: AuthService,
    private servicio: ServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    // console.log(this.user.id_usuario);
    this.obtener_servicios_plan_usuario();
  }

  obtener_servicios_plan_usuario() {
    var objeto_spu = {
      id_usuario: this.user.id_usuario,
    };
    this.servicio
      .servicios_plan_del_usuario(objeto_spu)
      .subscribe((data: any) => {
        this.servicios_del_usuario = data;
        var cantidad = this.servicios_del_usuario.length;

        this.servicios_del_usuario.forEach((element) => {
          if (element.tipo_servicio == 1) {
            element.fecha = this.transofrmar_fecha(element.fecha);
            this.servicios_cancha.push(element);
          } else if (element.tipo_servicio == 2) {
            element.fecha = this.transofrmar_fecha(element.fecha);
            this.servicios_paseo.push(element);
          }
        });
        // console.log(this.servicios_del_usuario);
      });
  }

  transofrmar_fecha(fecha_recibida) {
    var fs = new Date(fecha_recibida);
    var ds = fs.getDate();
    var ms = fs.getMonth() + 1;
    var ys = fs.getFullYear();
    var fecha_transformada = ds + "-" + ms + "-" + ys;
    return fecha_transformada;
  }

  cancelar_paseo(elemento, index) {
    this.router2.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router2.navigate(["/user/mis_servicios"]));
      this.servicio.cancelar_paseo(elemento.toString()).subscribe((data) => {
        $(".index_card_paseo").remove("#" + index + "");
      });
  }


  cancelar_cancha(elemento, index) {
    this.router2.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
      this.router2.navigate(["mis-servicios"]));

    // this.servicio.cancelar_cancha(elemento.toString()).subscribe((data) => {
    //   $(".index_card_cancha").remove("#" + index + "");
    // });
  }
}
