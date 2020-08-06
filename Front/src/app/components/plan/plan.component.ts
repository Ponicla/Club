import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { ActivatedRoute } from "@angular/router";
import { usuariointerface } from "src/app/models/usuario-interface";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"],
})
export class PlanComponent implements OnInit {
  user: usuariointerface;
  plan: any = {};
  loadingPlan: boolean;

  constructor(
    private authService: AuthService,
    private servicio: ServiceService,
    private router: ActivatedRoute,
  ) {}
  ngOnInit() {

    this.user = this.authService.getCurrentUser();
    this.loadingPlan = false;
    this.router.params.subscribe((params) => {
      this.servicio.obtenerPlaneById(params.id).subscribe((data) => {
        this.plan = data;
        this.loadingPlan = true;
      });
    });
  }
  contratar_plan() {
    
    Swal.fire({
      title: "ESTA POR CONTRATAR EL PLAN " + this.plan[0].nombre.toUpperCase(),
      text: "Revise su pedido",
      width: 600,
      padding: "3em",
      background: "#fff url(./assets/dido2.jpg)",
      backdrop: `
      rgba(0, 96, 255, 0.4)
        url("https://downloadwap.com/thumbs3/screensavers/d/new/misc/dancing_dinosaur-324067.gif")
        bottom
        no-repeat
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.value) {

        let objeto_pagar = {
          precio: parseInt(this.plan[0].costo),
          nombre: "PLAN " + this.plan[0].nombre.toUpperCase() + " CLUB NICETO",
          cantidad: 1,
        };
        localStorage.setItem("reset_id_plan",this.plan[0].id_plan);
         this.servicio.pagar(objeto_pagar).subscribe((data) => {
           console.log(data);
           var url = data.toString();
           window.open(url, '_blank');
         });
        
      }
    });
  }
}
