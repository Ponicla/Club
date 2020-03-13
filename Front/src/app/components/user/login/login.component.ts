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

  constructor(private authService: AuthService, private router: Router) { }
  private user: usuariointerface ={
    nombre:'',
    password: ''
  }

  ngOnInit() {}

  onLogin(){
    return this.authService.loginUser(this.user.nombre, this.user.password).subscribe(user =>{ 
      if(user[0] != undefined){
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
