import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { usuariointerface } from '../models/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/JSON"
  });

  registerUser(nombre: String, mail: String, password:String) {
    const url = 'http://localhost:3000/usuario';
    return this.http.post(url, {nombre, mail, password}, {headers: this.headers}).pipe(map(data => data)
    )
  }

  loginUser(nombre: String, password: String): Observable<any> {
    const url = 'http://localhost:3000/usuario/login';
    return this.http.post(url, {nombre, password}, {headers: this.headers}).pipe(map(data => data));
  }

  setUser(user):void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }


  setToken(token):void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(){
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
