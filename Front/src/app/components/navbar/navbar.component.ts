import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: usuariointerface;
  rol: number;

  constructor(
    private router : Router,
    private authService : AuthService,
    ) { }
    
  public app_name = "Club";

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.rol = this.user['rol'];
  }

  onLogout(){
    localStorage.removeItem("currentUser");

    Swal.fire({
      title: 'Adios',
      text: 'Esperamos verte pronto',
      showConfirmButton: false,
      timer: 1500,
    })
      this.router.navigate(['/user/login']);
    
  }
  
}
