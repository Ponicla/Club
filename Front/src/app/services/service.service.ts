import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { personainterface } from '../models/persona-interface';
import { comerciointerface } from '../models/comercio-interface';
import { planinterface } from '../models/plan-interface';
import { serviciointerface } from '../models/servicio-interface';
import { usuariointerface } from '../models/usuario-interface';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

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
    id_gfamiliar: '',
    id_usuario: ''
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
    costo: '',
    imagen: '',
  };

  public selectedServicio: serviciointerface = {
    id: null,
    nombre: '',
    descripcion: '',
    id_plan: '',
    imagen: '',
  };

  

  constructor(
    private consulta: HttpClient,
    private authService : AuthService,
    public afAuth: AngularFireAuth
    ) { 
    this.user = this.authService.getCurrentUser();
  }
  user: usuariointerface;
  // headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: this.authService.getToken()
  // });

  // async login_google(){
  //    try{
  //      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  //    }catch(error){
  //      console.log(error);
  //  }
  // }

  get_estado_paseador(id: String){
    const url = `http://localhost:3000/usuario_paseador/${id}`;
    return this.consulta.get(url).pipe(map(data  => data));
  }

  update_paseador(paseador , id: String){
    const url = `http://localhost:3000/usuario_paseador/${id}`;
    return this.consulta.put(url, paseador).pipe(map(data  => data));
  }

  update_paseador_h(paseador , id: String){
    const url = `http://localhost:3000/usuario_paseador_h/${id}`;
    return this.consulta.put(url, paseador).pipe(map(data  => data));
  }
  
  vincularUsuarioPersona(id: String){
    const url = `http://localhost:3000/usuario/${id}`;
    return this.consulta.put(url, id).pipe(map(data  => data));
  }

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

  obtenerPersonaById(id: String) {
    const url = `http://localhost:3000/persona/${id}`;
    return this.consulta.get(url).pipe(map(data  => data)); 
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

  obtenerPlaneById(id: String) {
    const url = `http://localhost:3000/plan/${id}`;
    return this.consulta.get(url).pipe(map(data  => data)); 
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

  contratar_plan(objeto_contratar){
    const url = `http://localhost:3000/contratar_plan`;
    return this.consulta.put(url, objeto_contratar).pipe(map(data  => data));
  }
  //PLANES
  

  //SERVICIOS
  obtenerServicios() {
    return this.consulta.get('http://localhost:3000/servicios').pipe(map(data  => data)); 
  }

  obtenerServicioById(id: String) {
    const url = `http://localhost:3000/servicio/${id}`;
    return this.consulta.get(url).pipe(map(data  => data)); 
  }

  eliminarServicio(id: String){
    const url = `http://localhost:3000/servicios/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }

  agregarServicio(plan){
    const url = `http://localhost:3000/servicios`;
    return this.consulta.post(url, plan).pipe(map(data  => data));
  }

  modificarServicio(servicio, id: String){
    const url = `http://localhost:3000/servicios/${id}`;
    return this.consulta.put(url, servicio).pipe(map(data  => data));
  }

  
  //SERVICIOS

  obtener_usuarios(){
    const url = `http://localhost:3000/usuario`;
    return this.consulta.get(url).pipe(map(data  => data));
  }

  //PASEOS
  agregar_paseo(paseo){
    const url = `http://localhost:3000/paseo`;
    return this.consulta.post(url, paseo).pipe(map(data  => data));
  }

  ///CANCHAS 
  obtener_canchas() {
    return this.consulta.get('http://localhost:3000/cancha').pipe(map(data  => data));
  }

  actualizar_estado_cancha(objeto_estado_cancha){
    const url = `http://localhost:3000/estado_cancha`;
    return this.consulta.put(url, objeto_estado_cancha).pipe(map(data  => data));
  }



  // agregarComercio(comercio){
  //   const url = `http://localhost:3000/comercios`;
  //   return this.consulta.post(url, comercio).pipe(map(data  => data));
    
  // }

  // modificarComercio(comercio, id: String){
  //   const url = `http://localhost:3000/comercios/${id}`;
  //   return this.consulta.put(url, comercio).pipe(map(data  => data));
  // }

  // eliminarComercio(id: String){
  //   const url = `http://localhost:3000/comercios/${id}`;
  //   return this.consulta.delete(url).pipe(map(data => data));
  // }


  //PASEOS
  agregar_alquiler(alquiler){
    const url = `http://localhost:3000/alquiler`;
    return this.consulta.post(url, alquiler).pipe(map(data  => data));
  }

  //PLAN SERVICIOS USUARIO
  obtener_servicios_plan_usuario(objeto_id_plan){
    const url = `http://localhost:3000/plan_usuario`;
    return this.consulta.post(url, objeto_id_plan).pipe(map(data  => data));
  }

  pagar(objeto_pagar){
    const url = `http://localhost:3000/payment`;
    return this.consulta.post(url, objeto_pagar).pipe(map(data  => data));
  }

}
