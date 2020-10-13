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
import { usuarioAdmininterface } from '../models/usuarioadmin-interface';

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

  public selectedUsuarioAdmin: usuarioAdmininterface = {
    id_usuario: null,
    mail: '',
    nombre: '',
    password: '',
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

  eliminar_cancha(id: String){
    const url = `http://localhost:3000/eliminar_cancha/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }


  nueva_cancha(objeto_nueva_cancha){
    const url = `http://localhost:3000/cancha`;
    return this.consulta.post(url, objeto_nueva_cancha).pipe(map(data  => data));
  }

  obtener_canchas() {
    return this.consulta.get('http://localhost:3000/cancha').pipe(map(data  => data));
  }

  actualizar_estado_cancha(objeto_estado_cancha){
    const url = `http://localhost:3000/estado_cancha`;
    return this.consulta.put(url, objeto_estado_cancha).pipe(map(data  => data));
  }



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

  pagar_cancha(objeto_pagar){
    const url = `http://localhost:3000/payment_cancha`;
    return this.consulta.post(url, objeto_pagar).pipe(map(data  => data));
  }
  pagar_paseo(objeto_pagar){
    const url = `http://localhost:3000/payment_paseo`;
    return this.consulta.post(url, objeto_pagar).pipe(map(data  => data));
  }

  

  servicios_plan_del_usuario(objeto_spu){
    const url = `http://localhost:3000/servicios_del_usuarios`;
    return this.consulta.post(url, objeto_spu).pipe(map(data  => data));
  }

  cancelar_paseo(id: String){
    const url = `http://localhost:3000/paseo/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }

  cancelar_cancha(id: String){
    const url = `http://localhost:3000/cancha/${id}`;
    return this.consulta.delete(url).pipe(map(data => data));
  }


  // USER ADMIN REGISTER
  create_usuario_admin(objeto_u_admin){
    const url = `http://localhost:3000/usuario_admin`;
    return this.consulta.post(url, objeto_u_admin).pipe(map(data  => data));
  }

  obtener_usuarios_admin(){
    const url = `http://localhost:3000/obtener_usuario_admin`;
    return this.consulta.get(url).pipe(map(data  => data));
  }

  obtener_usuarios_normal(){
    const url = `http://localhost:3000/obtener_usuario_normal`;
    return this.consulta.get(url).pipe(map(data  => data));
  }


  reporte_uno(fecha){
    const url = `http://localhost:3000/reporte_uno`;
    return this.consulta.post(url, fecha).pipe(map(data  => data));
  }

  reporte_dos(){
    const url = `http://localhost:3000/reporte_dos`;
    return this.consulta.get(url).pipe(map(data  => data));
  }

  reporte_tres(fecha){
    const url = `http://localhost:3000/reporte_tres`;
    return this.consulta.post(url, fecha).pipe(map(data  => data));
  }

  reporte_cuatro(fecha){
    const url = `http://localhost:3000/reporte_cuatro`;
    return this.consulta.post(url, fecha).pipe(map(data  => data));
  }

  verifacar_ratoneada_paseador(id_usuario_rata){
    const url = `http://localhost:3000/verifacar_ratoneada_paseador`;
    return this.consulta.post(url, id_usuario_rata).pipe(map(data  => data));
  }

  verifacar_disponibilidad_del_turno(objeto_no_pisar_otro_turno){
    const url = `http://localhost:3000/verifacar_disponibilidad_del_turno`;
    return this.consulta.post(url, objeto_no_pisar_otro_turno).pipe(map(data  => data));
  }

  check_vencimiento_plan(id_usuario){
    const url = `http://localhost:3000/check_vencimiento_plan`;
    return this.consulta.post(url, id_usuario).pipe(map(data  => data));
  }

  cantidad_alquileres_por_cancha(id_cancha){
    const url = `http://localhost:3000/cantidad_alquileres_por_cancha`;
    return this.consulta.post(url, id_cancha).pipe(map(data  => data));
  }

  paseos_pendientes_por_paseador(fk_id_usuario){
    const url = `http://localhost:3000/paseos_pendientes_por_paseador`;
    return this.consulta.post(url, fk_id_usuario).pipe(map(data  => data));
  }

  informe_de_vencimiento(id_usuario){
    const url = `http://localhost:3000/informe_de_vencimiento`;
    return this.consulta.post(url, id_usuario).pipe(map(data  => data));
  }

  verifacar_disponibilidad_del_paseos(objeto_no_pisar_otro_vpaseo){
    const url = `http://localhost:3000/verifacar_disponibilidad_del_paseos`;
    return this.consulta.post(url, objeto_no_pisar_otro_vpaseo).pipe(map(data  => data));
  }
  

  
}
