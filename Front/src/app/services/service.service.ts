import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { personainterface } from '../models/persona-interface';
import { comerciointerface } from '../models/comercio-interface';
import { planinterface } from '../models/plan-interface';



@Injectable()

export class ServiceService {
  personas: Observable<any>;
  persona: Observable<any>;
  comercios: Observable<any>;
  comercio: Observable<any>;
  

  public selectedPersona: personainterface = {
    id: null,
    nombre: '',
    apellido: '',
    dni: '',
    id_gfamiliar: ''
  };

  public selectedComercio: comerciointerface = {
    id: null,
    nombre: '',
    descuento: ''
  };

  public selectedPlan: planinterface = {
    id: null,
    nombre: '',
    descripcion: '',
    costo: ''
  };

  

  constructor(private consulta: HttpClient) { }
  // headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: this.authService.getToken()
  // });
  
  
 

  obtenerTodos() {
    return this.consulta.get('http://localhost:3000/comercios').pipe(map(data  => data));
  }

  agregarComercio(comercio){
    const url = `http://localhost:3000/comercios`;
    return this.consulta.post(url, comercio).pipe(map(data  => data));
    
  }

  modificarComercio(comercio, id: String){
    const url = `http://localhost:3000/comercios/${id}`;
    return this.consulta.put(url, comercio).pipe(map(data  => data));
  }

  eliminarComercio(id: String){
    const url = `http://localhost:3000/comercios/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }


  //PERSONA
  obtenerPersonas() {
    return this.consulta.get('http://localhost:3000/persona').pipe(map(data  => data)); 
  }

  eliminarPersona(id: String){
    const url = `http://localhost:3000/persona/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }

  agregarPersona(persona){
    const url = `http://localhost:3000/persona`;
    return this.consulta.post(url, persona).pipe(map(data  => data));
  }

  modificarPersona(persona, id: String){
    const url = `http://localhost:3000/persona/${id}`;
    return this.consulta.put(url, persona).pipe(map(data  => data));
  }
  //PERSONA

  //PLANES
  obtenerPlanes() {
    return this.consulta.get('http://localhost:3000/plan').pipe(map(data  => data)); 
  }

  eliminarPlan(id: String){
    const url = `http://localhost:3000/plan/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }

  agregarPlan(plan){
    const url = `http://localhost:3000/plan`;
    return this.consulta.post(url, plan).pipe(map(data  => data));
  }

  modificarPlan(plan, id: String){
    const url = `http://localhost:3000/plan/${id}`;
    return this.consulta.put(url, plan).pipe(map(data  => data));
  }
  //PLANES
  

}
