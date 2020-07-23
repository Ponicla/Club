import { Component, OnInit, Input, Pipe } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { usuariointerface } from '../../models/usuario-interface';
import { Location } from '@angular/common';
import { comerciointerface } from 'src/app/models/comercio-interface';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() items: any[] = [];

  comercios: any[];
  planes: any[];
  servicios: any[];
  plan: any[];

  constructor(
    private servicio: ServiceService, 
    private location: Location,
    private router: Router
    ) { }

  ngOnInit() {
    this.getListaComercios();
    this.getListaPLanes();
    this.getListaServicios();

    // let bw = new Uint8Array([47,118,97,114,47,119,119,119,47,67,108,117,98,47,70,114,111,110,116,47,115,114,99,47,97,115,115,101,116, 115,47,112,108,97,116,97,46,106,112,103]);
    // let str = new TextDecoder().decode(bw);
    // console.log("stringimagen " + str);
  }

  getListaComercios() {
    this.servicio.obtenerTodos().subscribe((data: any) => {
      this.comercios = data;
      // console.log(data);
    });
  }

  deleteComercio(id: string) {
    if (confirm("Estas seguro de eliminar?")) {
      this.servicio.eliminarComercio(id).subscribe(persona => location.reload());
    }
  }

  preActualizarComercio(comercio: comerciointerface): void{
    this.servicio.selectedComercio = Object.assign({}, comercio);
  }

  resetForm(comercioForm?: NgForm): void{
    this.servicio.selectedComercio ={
      id: null,
      nombre: '',
      descuento: ''
    }
  }

  getListaPLanes() {
    this.servicio.obtenerPlanes().subscribe((data: any) =>  {
      
      /* for (var i in data){
        let bw = new Uint8Array(data[i].imagen.data);
        let str = new TextDecoder().decode(bw);
        console.log("stringimagen " + str);
        data[i].imagen = str;
      } */
      this.planes = data;
      console.log('PLANES');
      console.log(data);
    })
  }

  getListaServicios() {
    this.servicio.obtenerServicios().subscribe((data: any) =>  {
      /* for (var i in data){
        let bw = new Uint8Array(data[i].imagen.data);
        let str = new TextDecoder().decode(bw);
        console.log("stringimagen " + str);
        data[i].imagen = str;
      } */
      this.servicios = data;
      console.log('SERVICIOS');
      console.log(data);
    })
  }

  

  observarPlan(card: any){
    let planId;
    planId = card.id_plan;
    this.router.navigate(["/plan", planId]);
  }

  observarServicio(card: any){
    let servicio_id;
    servicio_id = card.id_servicio;
    this.router.navigate(["/user/contratar-servicio", servicio_id]);
  }

  mostrar(){
    alert('PIKACHU');
  }

 

}





