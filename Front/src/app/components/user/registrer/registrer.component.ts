import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


import { CompileReflector } from '@angular/compiler';
@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  

  constructor(private authService: AuthService, private router: Router) { }

  private user: usuariointerface = {
    nombre: "",
    mail: "",
    password: ""
  };
 
  ngOnInit() {}

  onRegistro(): void{
    this.authService.registerUser(this.user.nombre, this.user.mail, this.user.password).subscribe(user => {
     this.authService.setUser(user);
      Swal.fire({
        icon: 'success',
        title: 'Registro con exito',
        text: 'Por favor revise su casilla de correo electronico',
      }).then((result) =>{
        this.router.navigate(['/user/login']);
        /* window.location.href =  */
      });
  
      
      
    }); 
    
    //console.log(this.user);
    
  }


   
    


}
