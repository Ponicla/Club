import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];


  constructor(
    private authService: AuthService, 
    private router: Router
    ) { }
  private user: usuariointerface ={
    nombre:'',
    password: ''
  }

  ngOnInit() {
    this.bodyTag.classList.add('bg-color-gradient');
     this.htmlTag.classList.add('bg-color-gradient');
  }
  ngOnDestroy() {
    
    this.bodyTag.classList.remove('bg-color-gradient');
    this.htmlTag.classList.remove('bg-color-gradient');
  }

  async onLoginGoogle(){
    
    try{
     await this.authService.login_google();
     await this.authService.getCurrentUserGoogle();
    }
    catch(error){
      console.log(error);
    }
    
  }

  onLogin(){
    return this.authService.loginUser(this.user.nombre, this.user.password).subscribe(user =>{
      console.log('RESPUESTA DE BASE DE DATOS', user); 
      if(user[0] != undefined){
        //SETEAR EN LOCALSTORAGE
        this.authService.setUser(user[0]);
        Swal.fire({
          icon: 'success',
          title: 'Bienvendio',
          showConfirmButton: false,
          timer: 1500
        }).then((result) =>{
          this.router.navigate(['/']);
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'ERORR'
        }).then((result) =>{
          this.router.navigate(['/user/login']);
        });
      }
    },
    error => console.log("ERROR")
    );
  }

}
