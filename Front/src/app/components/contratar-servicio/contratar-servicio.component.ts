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
  servicios_del_usuario: any[];
  servicios_cancha: any[] = [];
  servicios_paseo: any[] = [];
  
  constructor(
    private router: ActivatedRoute,
    public service: ServiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadingServicio = false;
    this.router.params.subscribe((params) => {
      this.service.obtenerServicioById(params.id).subscribe((data) => {
        this.servicio = data;
        this.loadingServicio = true;
      });
    });
    // this.obtener_servicios_plan_usuario(this.user.id_plan);
    
    this.obtener_lista_personas_paseadoras();
    this.obtener_comercios();
    this.obtener_lista_canchas_habilitadas();
    
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

      //chek si tiene el servicio en su plan
      
      var objeto_id_plan = {
        id_plan: this.user.id_plan, 
      };

      //Funcion que trae los servicios que tiene el plan del usuario
      this.service.obtener_servicios_plan_usuario(objeto_id_plan).subscribe((data: any) => {
        let contador_si_tiene = 0;
        this.plan_servicios_user = data;
        //recorre el arreglo y controla si f5 está
        this.plan_servicios_user.forEach(element => {
          console.log('Tiene: ', (element.nombre).toUpperCase());
          if((element.nombre).toUpperCase() == "FUTBOL 5"){
            contador_si_tiene  =+ 1;
          }
        });

        if(contador_si_tiene >= 1){

          var objeto_spu = {
            id_usuario: this.user.id_usuario,
          };
          //controla la cantidad de canchas alq
          this.service.servicios_plan_del_usuario(objeto_spu).subscribe((data: any) => {
              this.servicios_del_usuario = data;
              this.servicios_del_usuario.forEach((element) => {
                if (element.tipo_servicio == 1) {
                  this.servicios_cancha.push(element);
                }
              });
              if(this.servicios_cancha.length >= 4){
                Swal.fire({
                  text: "Ha superado su cuota de alquileres gratis",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Pagar para alquilar',
                  cancelButtonText: 'Volver'
                }).then((result) => {
                  if (result) {
                    let nombre_cancha = $("#select_cancha option:selected").text();

                    Swal.fire({
                      text: "Superaste la cuota de canchas gratis para este mes, selecciona pagar para alquilar si la quieres igual",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Pagar para alquilar',
                      cancelButtonText: 'Volver'
                    }).then((result) => {
                      if (result == true){
                        this.ir_mp_pagar(1500, 'Alquiler ' + nombre_cancha + ' en club niceto ', 1);
                      }
                    });
                  }
                });
              }else{//se fija que el turno no esté ocupado, obvio
                let objeto_no_pisar_otro_turno = {
                  id_cancha: $("#select_cancha").val(),
                  horario: $("#select_hora_turno_cancha :selected").text(),
                  fecha: $("#select_fecha_turno_cancha").val(),
                };
                this.service.verifacar_disponibilidad_del_turno(objeto_no_pisar_otro_turno).subscribe((data_2 : any) => {
                  if(data_2.length > 0){
                    //negar alquiler
                    Swal.fire({
                      text: "El turno esta ocupado, seleccione otro",
                      icon: 'warning',
                    });
                  }else{// si no está ocupado, verifica que no se pase de su fecha de baja del plan
                    this.service.check_vencimiento_plan(objeto_spu).subscribe( (data3 : any ) => {
                      console.log(data3[0].fecha_baja_plan);
                      console.log($("#select_fecha_turno_cancha").val());

                      if($("#select_fecha_turno_cancha").val() > data3[0].fecha_baja_plan){
                        let nombre_cancha = $("#select_cancha option:selected").text();

                        Swal.fire({
                          text: "Tu plan estara vencido en la fecha seleccionada, selecciona otra, o elige pagar para jugar si quieres ese turno cabron",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Pagar para alquilar',
                          cancelButtonText: 'Volver'
                        }).then((result) => {
                          if (result == true){
                            this.ir_mp_pagar(1500, 'Alquiler ' + nombre_cancha + ' en club niceto ', 1);
                          }
                        });
                      }else{
                        let objeto_alquiler = {
                          id_cancha: $("#select_cancha").val(),
                          horario: $("#select_hora_turno_cancha :selected").text(),
                          fecha: $("#select_fecha_turno_cancha").val(),
                          fk_id_usuario: this.user.id_usuario,
                        };
                        this.service.agregar_alquiler(objeto_alquiler).subscribe();
                          Swal.fire({
                            icon: "success",
                            title: "Genial",
                            text: "El el turno es tuyo, no nos falles",
                          }); 
                        $("#select_cancha").val("");
                        $("#select_hora_turno_cancha").val("");
                        $("#select_fecha_turno_cancha").val("");
                        console.log('darle el turno'); 
                      } 
                    });
                  }
                });
              }
            });  
            

        }else{//sino, mp raton
          // Cobrarle el turno
          Swal.fire({
            text: "Si quieres este alquiler deberas pagarlo, tu plan no tiene el servicio incluido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pagar para alquilar',
            cancelButtonText: 'Volver'
          }).then((result) => {
            if (result == true) {
              let nombre_cancha = $("#select_cancha option:selected").text();
                this.ir_mp_pagar(1500, 'Alquiler ' + nombre_cancha + ' en club niceto ', 1);       
            }
          });
        }
      });

    }
  }


  ir_mp_pagar(precio, nombre, cantidad){
    let objeto_pagar = {
      precio: precio,
      nombre: nombre,
      cantidad: cantidad,
    };
    /* localStorage.setItem("reset_id_plan",this.plan[0].id_plan); */
     this.service.pagar(objeto_pagar).subscribe((data) => {
       console.log(data);
       var url = data.toString();
       window.open(url, '_blank');
     });
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
