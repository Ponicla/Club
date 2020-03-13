import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { usuariointerface } from 'src/app/models/usuario-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService) { }

  user: usuariointerface;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    
    
    
  }



}
