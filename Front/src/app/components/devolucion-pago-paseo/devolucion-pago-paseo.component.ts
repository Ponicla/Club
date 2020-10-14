import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-devolucion-pago-paseo',
  templateUrl: './devolucion-pago-paseo.component.html',
  styleUrls: ['./devolucion-pago-paseo.component.css']
})
export class DevolucionPagoPaseoComponent implements OnInit {

  constructor(
    private servicio: ServiceService
  ) { }

  ngOnInit(): void {
    var id_usuario = parseInt(localStorage.getItem("reset_fk_id_usuario"));
    var id_paseador = parseInt(localStorage.getItem("reset_id_paseador"));
    var fecha = localStorage.getItem("reset_fecha");
    var horario = localStorage.getItem("reset_id_rango_h");
    var cantidad = localStorage.getItem("reset_cantidad");
    var direccion = localStorage.getItem("reset_direccion");

    let objeto_paseo = {
      "id_paseador" : id_paseador,
      "cantidad" : cantidad,
      "fecha" : fecha,
      "id_rango_h" : horario,
      "direccion" : direccion,
      "fk_id_usuario" : id_usuario
    };

    this.servicio.agregar_paseo(objeto_paseo).subscribe();

    localStorage.removeItem("reset_fk_id_usuario");
    localStorage.removeItem("reset_id_paseador");
    localStorage.removeItem("reset_fecha");
    localStorage.removeItem("reset_id_rango_h");
    localStorage.removeItem("reset_cantidad");
    localStorage.removeItem("reset_direccion");
  
  }
}
