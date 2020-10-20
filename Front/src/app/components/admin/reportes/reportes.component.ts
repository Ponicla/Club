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
  resultado_reporte_dos : [];
  resultado_reporte_tres : [];
  resultado_reporte_cuatro : any[];
  repetidos = [];

  constructor(
    private router: Router,
    private servicio: ServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.resultado_reporte_uno = [];
    this.resultado_reporte_dos = [];
    this.resultado_reporte_tres = [];
    this.resultado_reporte_cuatro = [];
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
    }, 500);
  }

  funcion_reporte_dos(){

    this.servicio.reporte_dos().subscribe( (data: any) => {
      this.resultado_reporte_dos = data;
      console.log(this.resultado_reporte_dos);
      $("#tabla_reporte_dos").dataTable().fnDestroy();
      $('#tabla_reporte_dos').attr("hidden", false);
      
    });
    setTimeout(function () {
      $(function () {
        $("#tabla_reporte_dos").DataTable({
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
        title: 'Reporte de paseadores activos ' 
      },
    ]
        });
      });
    }, 250);
  }

  funcion_reporte_tres(){
    var fecha_reporte_tres = $('#fecha_reporte_tres').val();
    // console.log(fecha_reporte_tres);
    var fecha_r3 = {
      fecha: fecha_reporte_tres
    }
    
    this.servicio.reporte_tres(fecha_r3).subscribe( (data: any) => {
      this.resultado_reporte_tres = data;
      var repetidos = {};

      data.forEach(function(registro) { 
          var cantidad = registro["nombre"];
          repetidos[cantidad] = repetidos[cantidad] ? (repetidos[cantidad] + 1) : 1;
      });
      
      this.repetidos = Object.keys(repetidos).map(function(cantidad) {
        
        return { NOMBRE: cantidad, CANTIDAD: repetidos[cantidad] };
      });

      $("#tabla_reporte_tres").dataTable().fnDestroy();
      $('#tabla_reporte_tres').attr("hidden", false);
      
    });
    setTimeout(function () {
      $(function () {
        $("#tabla_reporte_tres").DataTable({
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
        title: 'Cantidad de alquileres que se registraron para las canchas a parti del ' + fecha_r3.fecha 
      },
    ]
        });
      });
    }, 250);
  }
  
  funcion_reporte_cuatro(){
    var fecha_reporte_cuatro = $('#fecha_reporte_cuatro').val();
    console.log(fecha_reporte_cuatro);
    var fecha_r4 = {
      fecha: fecha_reporte_cuatro
    }
    
    this.servicio.reporte_cuatro(fecha_r4).subscribe( (data: any) => {
      this.resultado_reporte_cuatro = data;
      console.log(this.resultado_reporte_cuatro);

      
      this.resultado_reporte_cuatro.forEach((element) => {
          element.fecha_alta_como_usuario = this.transofrmar_fecha(element.fecha_alta_como_usuario);
      });


      $("#tabla_reporte_cuatro").dataTable().fnDestroy();
      $('#tabla_reporte_cuatro').attr("hidden", false);
      $('#cantidad_en_r4').text('Se registraron ' + data.length + ' usuarios desde la fecha dada');
      console.log(data.length);
    });
    setTimeout(function () {
      $(function () {
        $("#tabla_reporte_cuatro").DataTable({
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
        title: 'Reporte alta de usuarios en la pagina a partir del ' + fecha_r4.fecha 
      },
    ]
        });
      });
    }, 250);
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
