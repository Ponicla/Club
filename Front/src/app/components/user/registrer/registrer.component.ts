import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { usuariointerface } from "src/app/models/usuario-interface";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

import { CompileReflector } from "@angular/compiler";
@Component({
  selector: "app-registrer",
  templateUrl: "./registrer.component.html",
  styleUrls: ["./registrer.component.css"],
})
export class RegistrerComponent implements OnInit {
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
  
  constructor(
      private authService: AuthService, 
      private router: Router
    ) {}

  private user: usuariointerface = {
    nombre: "",
    mail: "",
    password: "",
  };

  ngOnInit() {
    this.bodyTag.classList.add('bg-color-gradient');
     this.htmlTag.classList.add('bg-color-gradient');
  }
  ngOnDestroy() {
    
    this.bodyTag.classList.remove('bg-color-gradient');
    this.htmlTag.classList.remove('bg-color-gradient');
  }

  onRegistro(): void {

    this.authService.check_user_unique_mail().subscribe( (data : any) => {
      var count = false;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(this.user.mail == element.mail){
          count = true;
        }
      }
      if(count == false){ 
          this.authService.registerUser(this.user.nombre, this.user.mail, this.user.password).subscribe((user) => {
            console.log(user);
              this.authService.setUser(user);
              Swal.fire({
                icon: "success",
                title: "Registro con exito",
                text: "Por favor revise su casilla de correo electronico",
              }).then((result) => {
                this.router.navigate(["/user/login"]);
              });
          });
       }else if (count == true){
        Swal.fire({
          icon: 'error',
          title: 'Momento',
          text: 'Correo ya creado, intente con otro o recuerda tu contraseña',
        })
       }
    });


    
  }
}
