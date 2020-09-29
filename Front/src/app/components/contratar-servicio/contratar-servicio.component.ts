import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";
import $ from "jquery";
import Swal from "sweetalert2";
import { AuthService } from "src/app/services/auth.service";
import { usuariointerface } from "src/app/models/usuario-interface";

@Component({
  selector: "app-contratar-servicio",
  templateUrl: "./contratar-servicio.component.html",
  styleUrls: ["./contratar-servicio.component.css"],
})
export class ContratarServicioComponent implements OnInit {
  servicio: any = {};
  loadingServicio: boolean;
  canchas: any[];
  usuarios_no_paseadores: any[];
  usuarios_si_paseadores: any[] = [];
  user: usuariointerface;
  plan_servicios_user: any[];
  todas_las_canchas: any[];
  comercios: any[];
  canchas_habilitadas: any[] = [];
  
  constructor(
    private router: ActivatedRoute,
    public service: ServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadingServicio = false;
    this.router.params.subscribe((params) => {
      this.service.obtenerServicioById(params.id).subscribe((data) => {
        this.servicio = data;
        this.loadingServicio = true;

        this.obtener_servicios_plan_usuario(this.user.id_plan);
      });
    });

    this.obtener_lista_personas_paseadoras();
    this.obtener_comercios();

    this.obtener_lista_canchas_habilitadas();
  }

  obtener_servicios_plan_usuario(id_plan) {
    var objeto_id_plan = {
      id_plan: id_plan,
    };
    this.service
      .obtener_servicios_plan_usuario(objeto_id_plan)
      .subscribe((data: any) => {
        this.plan_servicios_user = data;
        // console.log(this.plan_servicios_user);
      });
  }

  guardar_turno() {
    if (
      $("#select_cancha").val() == "" ||
      $("#select_hora_turno_cancha").val() == "" ||
      $("#select_fecha_turno_cancha").val() <= this.obtener_fecha_actual()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Ha olvidado algo",
        text:
          "Compruebe si completo todos los campos, o esta intentando pedir un turno en un dia anterior a hoy",
      });
    } else {
      let objeto_alquiler = {
        id_cancha: $("#select_cancha").val(),
        horario: $("#select_hora_turno_cancha :selected").text(),
        fecha: $("#select_fecha_turno_cancha").val(),
        fk_id_usuario: this.user.id_usuario,
      };
      // console.log(objeto_alquiler);

      this.service.agregar_alquiler(objeto_alquiler).subscribe();
      Swal.fire({
        icon: "success",
        title: "Genial",
        text: "El el turno es tuyo, no nos falles",
      });

      $("#select_cancha").val("");
      $("#select_hora_turno_cancha").val("");
      $("#select_fecha_turno_cancha").val("");
    }
  }

  guardar_paseos() {
    // console.log("FECHA SELECCIONADA ", $("#select_fecha").val());
    // console.log("FECHA HOY ", this.obtener_fecha_actual());
    if (
      $("#select_paseador").val() == "" ||
      $("#cantidad").val() == "" ||
      $("#select_fecha").val() == "" ||
      $("#select_hora").val() == "null" ||
      $("#direccion").val() == "" ||
      $("#select_fecha").val() <= this.obtener_fecha_actual()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Ha olvidado algo",
        text:
          "Compruebe si completo todos los campos, o esta intentando pedir un paseo en un dia anterior",
      });
    } else {
      let objeto_paseo = {
        id_paseador: $("#select_paseador").val(),
        cantidad: $("#cantidad").val(),
        fecha: $("#select_fecha").val(),
        id_rango_h: $("#select_hora :selected").text(),
        direccion: $("#direccion").val(),
        fk_id_usuario: this.user.id_usuario,
      };
      // console.log(objeto_paseo);

      this.service.agregar_paseo(objeto_paseo).subscribe();
      Swal.fire({
        icon: "success",
        title: "Genial",
        text: "El paseador ira a divertir a sus mascotas",
      });

      $("#cantidad").val("");
      $("#select_fecha").val("");
      $("#select_hora").val("0");
      $("#select_paseador").val("0");
      $("#direccion").val("");
    }
  }

  obtener_fecha_actual() {
    var f = new Date();
    var dia = f.getDate();
    var mes = f.getUTCMonth() + 1;
    var year = f.getFullYear();
    
    let d = this.formatear_diaomes_con0(dia, 2);
    let m = this.formatear_diaomes_con0(mes, 2);
    var fecha = year + "-" + m + "-" + d;
    return fecha;
  }

  formatear_diaomes_con0(number, width) {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";
    if (width <= length) {
      if (number < 0) {
        return "-" + numberOutput.toString();
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return "-" + zero.repeat(width - length) + numberOutput.toString();
      } else {
        return zero.repeat(width - length) + numberOutput.toString();
      }
    }
  }

  obtener_lista_personas_paseadoras() {
    this.service.obtener_usuarios().subscribe((data: any) => {
      this.usuarios_no_paseadores = data;
      for (let i = 0; i < this.usuarios_no_paseadores.length; i++) {
        let element = this.usuarios_no_paseadores[i];
        if (element.paseador == true && element.paseador_habilitado == true) {
          this.usuarios_si_paseadores.push(element);
        }
      }
    });
  }

  obtener_lista_canchas_habilitadas() {
    this.service.obtener_canchas().subscribe((data: any) => {
      this.canchas = data;
      for (let c = 0; c < this.canchas.length; c++) {
        let cancha = this.canchas[c];
        if (cancha.estado == 1) {
           this.canchas_habilitadas.push(cancha);     
        }
      }
    });
  }

  obtener_comercios(){
    this.service.obtenerTodos().subscribe((data: any) => {
      this.comercios = data;
      // console.log(this.comercios);
    });
  }
}
