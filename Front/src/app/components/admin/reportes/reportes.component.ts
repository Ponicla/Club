import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  resultado_reporte_uno : [];

  constructor(
    private router: Router,
    private servicio: ServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    // $('#tabla_reporte_uno').hide();
    this.resultado_reporte_uno = [];
    
  
  }

  funcion_reporte_uno(){
    var fecha_reporte_uno = $('#fecha_reporte_uno').val();
    console.log(fecha_reporte_uno);
    var fecha_r1 = {
      fecha: fecha_reporte_uno
    }
    
    this.servicio.reporte_uno(fecha_r1).subscribe( (data: any) => {
      this.resultado_reporte_uno = data;
      console.log(this.resultado_reporte_uno);
      $("#tabla_reporte_uno").dataTable().fnDestroy();
      $('#tabla_reporte_uno').attr("hidden", false);
      
    });
    setTimeout(function () {
      $(function () {
        $("#tabla_reporte_uno").DataTable({
          "language": {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
              sFirst: "Primero",
              sLast: "Último",
              sNext: "Siguiente",
              sPrevious: "Anterior",
            },
            oAria: {
              sSortAscending: ": Activar para ordenar la columna de manera ascendente",
              sSortDescending: ": Activar para ordenar la columna de manera descendente",
            }
        },
        responsive: "true",
        dom: 'Bfrtilp',       
        buttons:[ 
      {
        extend:    'excelHtml5',
        text:      '<i class="fas fa-file-excel"></i> ',
        titleAttr: 'Exportar a Excel',
        className: 'btn btn-success'
      },
      {
        extend:    'pdfHtml5',
        text:      '<i class="fas fa-file-pdf"></i> ',
        titleAttr: 'Exportar a PDF',
        className: 'btn btn-danger'
      },
      {
        extend:    'print',
        text:      '<i class="fa fa-print"></i> ',
        titleAttr: 'Imprimir',
        className: 'btn btn-info',
        title: 'Reporte de personas que no registran pagos desde ' + fecha_r1.fecha 
      },
    ]
        });
      });
    }, 25);
  }

}
