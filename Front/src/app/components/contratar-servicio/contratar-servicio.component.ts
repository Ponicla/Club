import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";
import $ from "jquery";
import Swal from "sweetalert2";

@Component({
  selector: "app-contratar-servicio",
  templateUrl: "./contratar-servicio.component.html",
  styleUrls: ["./contratar-servicio.component.css"],
})
export class ContratarServicioComponent implements OnInit {
  servicio: any = {};
  loadingServicio: boolean;

  usuarios_no_paseadores: any[];
  usuarios_si_paseadores: any[] = [];

  constructor(private router: ActivatedRoute, public service: ServiceService) {}

  ngOnInit(): void {

    this.loadingServicio = false;
    this.router.params.subscribe((params) => {
      this.service.obtenerServicioById(params.id).subscribe((data) => {
        this.servicio = data;
        this.loadingServicio = true;
      });
    });

    this.obtener_lista_personas_paseadoras();
  }

  guardar_paseos() {
    
    console.log("FECHA SELECCIONADA ", $("#select_fecha").val());
    console.log("FECHA HOY ", this.obtener_fecha_actual());
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
        id_rango_h: $("#select_hora").val(),
        direccion: $("#direccion").val(),
      };
      console.log(objeto_paseo);

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
}
