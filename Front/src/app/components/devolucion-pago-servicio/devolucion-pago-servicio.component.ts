import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-devolucion-pago-servicio',
  templateUrl: './devolucion-pago-servicio.component.html',
  styleUrls: ['./devolucion-pago-servicio.component.css']
})
export class DevolucionPagoServicioComponent implements OnInit {

  constructor(
    private servicio: ServiceService
  ) { }

  ngOnInit(): void {
    var id_usuario = parseInt(localStorage.getItem("reset_fk_id_usuario"));
    var id_cancha = parseInt(localStorage.getItem("reset_id_cancha"));
    var fecha = localStorage.getItem("reset_fecha");
    var horario = localStorage.getItem("reset_horario");


    let objeto_alquiler = {
      id_cancha: id_cancha,
      horario: horario,
      fecha: fecha,
      fk_id_usuario: id_usuario,
    };

    this.servicio.agregar_alquiler(objeto_alquiler).subscribe();

    localStorage.removeItem("reset_horario");
    localStorage.removeItem("reset_fecha");
    localStorage.removeItem("reset_id_cancha");
    localStorage.removeItem("reset_estado");
    localStorage.removeItem("reset_fk_id_usuario");

  }

}
