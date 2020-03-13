import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router) { }
  public app_name = "Club";
  ngOnInit() {
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
