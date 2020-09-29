import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { usuariointerface } from '../models/usuario-interface';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { info } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private router: Router
    ) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/JSON"
  });

  async login_google(){
    try{
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }catch(error){
      console.log(error);
  }
 }

  registerUser(nombre: string, mail: string, password:string) {
    
    const url = 'http://localhost:3000/usuario';
    return this.http.post(url, {nombre, mail, password}, {headers: this.headers}).pipe(map(data => data)
    )
  }

  registrar_usuario_google(mail_objeto){
    const url = 'http://localhost:3000/create_usuario_registrado_con_google';
    return this.http.post(url, mail_objeto, {headers: this.headers}).pipe(map(data => data));
  }


  
  check_user_unique_mail(){
    const url = `http://localhost:3000/check_user_unique_mail`;
    return this.http.get(url).pipe(map(data  => data));
  }



  loginUser(nombre: string, password: string): Observable<any> {
    
    const url = 'http://localhost:3000/usuario/login';
    return this.http.post(url, {nombre, password}, {headers: this.headers}).pipe(map(data => data));
  }

  setUser(user):void { 
    let user_local = {

      "id_usuario":user.id_usuario,
      "nombre":user.nombre,
      "mail":user.mail,
      "rol":user.rol,
      "id_plan" : user.fk_id_plan
    }
    
    localStorage.setItem("currentUser",JSON.stringify(user_local));
  }


  setToken(token):void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(){
    // console.log(this.afAuth.authState.pipe(first()).toPromise());
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)){
      let user = JSON.parse(user_string);
      return user;
  }else{
    return null;
  }
}

logoutUser(){
  localStorage.removeItem("currentUser");
}

  logoutUser2(){
    let accessToken = localStorage.getItem("accessToken")
    const url = `http://localhost:3000/usuario/logout?access_token={access_token}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post(url, {headers: this.headers});
  }

  // Google 
  verificar_existencia_mail_google(objeto_mail){
    const url = `http://localhost:3000/verificar_mail_google`;
    return this.http.post(url, objeto_mail).pipe(map(data  => data));
  }

  async getCurrentUserGoogle(){
    var regis = true;
    try {
      let correo = ((await this.afAuth.authState.pipe(first()).toPromise()).email);
      var objeto_mail = {
        mail : correo
      };
       
      this.verificar_existencia_mail_google(objeto_mail).subscribe((data: any) => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          const elemento = data[i];
          if(elemento.mail == correo){
            regis = false;
            if(elemento.cuenta_g == true){
              console.log('CORREO REGISTRADO COMO GOOGLE');
              let objeto_id_pls = {
                id: elemento.id_usuario
              }
              this.obtener_user_para_local_storage(objeto_id_pls).subscribe((data : any) => {
                // console.log(data);
                let user_local = {

                  "id_usuario":data[0].id_usuario,
                  "nombre":data[0].nombre,
                  "mail":data[0].mail,
                  "rol":data[0].rol,
                  "id_plan" : data[0].fk_id_plan
                }
                
                localStorage.setItem("currentUser",JSON.stringify(user_local));
                // console.log(user_local);
                Swal.fire({
                  icon: 'success',
                  title: 'Bienvendio',
                  showConfirmButton: false,
                  timer: 1500
                }).then((result) =>{
                   this.router.navigate(['/']);
                });
              });
            }else{
              console.log('CORREO REGISTRADO COMO NORMAL');
              Swal.fire({
                icon: 'info',
                html: '<h5>Este mail ya esta registrado en el sistema, intenta con otro o tambien puedes poner la contraseña <i class="fa fa-frown-o fa-lg" aria-hidden="true"></i></h5>',
                
                title: 'Lo lamentamos',
                
              })

            }
          }
        }
        if(regis == true){
          console.log('VA PARA REGISTRO');
          let objeto_mail = {
            mail: correo
          }
          this.registrar_usuario_google(objeto_mail).subscribe((data: any) => {
            let user_local = {

              "id_usuario":data[0].id_usuario,
              "nombre":data[0].nombre,
              "mail":data[0].mail,
              "rol":data[0].rol,
              "id_plan" : data[0].fk_id_plan
            }
            
            localStorage.setItem("currentUser",JSON.stringify(user_local));
            
            Swal.fire({
              icon: 'success',
              title: 'Bienvendio',
              showConfirmButton: false,
              timer: 1500
            }).then((result) =>{
              this.router.navigate(['/']);
            });
          });
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  obtener_user_para_local_storage(objeto_id_pls){
    const url = `http://localhost:3000/obtener_user_para_local_storage`;
    return this.http.post(url, objeto_id_pls).pipe(map(data  => data));
  }


  
}
