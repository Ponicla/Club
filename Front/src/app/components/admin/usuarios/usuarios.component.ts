import { Component, OnInit, Input } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Location } from "@angular/common";
import { personainterface } from "src/app/models/persona-interface";
import { NgForm } from "@angular/forms";
import { usuariointerface } from "src/app/models/usuario-interface";
import { AuthService } from "src/app/services/auth.service";
import $ from "jquery";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  @Input() items: any[] = [];
  personas: any[];
  usuarios: any[];
  usuarios_admines: any[];
  usuarios_normales: any[];
  rol: number;

  constructor(
    private router: Router,
    private servicio: ServiceService,
    private location: Location,
    private authService: AuthService
  ) {
    this.user = this.authService.getCurrentUser();
  }
  user: usuariointerface;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.rol = this.user["rol"];

    if (this.rol != 1) {
      Swal.fire({
        title: "Forro",
        text: "Por que quiere meter tus putas narices aqui, vete a la verga",
        icon: "question",
        confirmButtonText: "Decido marcharme",
      });
      this.router.navigate(["/"]);
    }
    this.usuarios_admines = [];
    this.getListaPersonas();
    this.getLista_usuarios();
    this.obtener_users_admin();
    this.obtener_users_normales();

    // $('#test_datatable_angular').DataTable();

    setTimeout(function () {
      $(function () {
        $("#test_datatable_angular, #test_datatable_angular2, #test_datatable_angular3").DataTable({
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
				className: 'btn btn-info'
			},
		]
        });
      });
    }, 300);

    // console.log($('#test_datatable_angular'));
  }

  getListaPersonas() {
    this.servicio.obtenerPersonas().subscribe((data: any) => {
      this.personas = data;
    });
  }

  getLista_usuarios() {
    this.servicio.obtener_usuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  deletePersona(id: string) {
    if (confirm("Estas seguro de eliminar?")) {
      this.servicio
        .eliminarPersona(id)
        .subscribe((persona) => location.reload());
    }
  }

  preActualizarPersona(persona: personainterface): void {
    this.servicio.selectedPersona = Object.assign({}, persona);
  }

  resetForm(personaForm?: NgForm): void {
    this.servicio.selectedPersona = {
      id: null,
      nombre: "",
      apellido: "",
      dni: "",
      id_gfamiliar: "",
      id_usuario: "",
    };
  }

  nuevo_admin() {}

  obtener_users_admin() {
    this.servicio.obtener_usuarios_admin().subscribe((data: any) => {
      this.usuarios_admines = data;
      // console.log(this.usuarios_admines);
    });
  }

  obtener_users_normales() {
    this.servicio.obtener_usuarios_normal().subscribe((data: any) => {
      this.usuarios_normales = data;
      // console.log(this.usuarios_normales);
    });
  }
}
