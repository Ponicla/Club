import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { usuariointerface } from '../models/usuario-interface';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth
    ) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/JSON"
  });

  async login_google(){
    try{
      console.log(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
      // return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }catch(error){
      console.log(error);
  }
 }

  registerUser(nombre: string, mail: string, password:string) {
    
    const url = 'http://localhost:3000/usuario';
    return this.http.post(url, {nombre, mail, password}, {headers: this.headers}).pipe(map(data => data)
    )
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
}
