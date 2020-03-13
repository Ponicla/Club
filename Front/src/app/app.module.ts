import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServiceService } from './services/service.service';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrerComponent } from './components/user/registrer/registrer.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HeroComponent } from './components/hero/hero.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule }   from '@angular/forms';
import { PlanesComponent } from './components/admin/planes/planes.component';
import { ModalNuevaPersonaComponent } from './components/modal/modal-nueva-persona/modal-nueva-persona.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalPlaneComponent } from './components/modal/modal-plane/modal-plane.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegistrerComponent,
    ProfileComponent,
    HeroComponent,
    UsuariosComponent,
    ModalComponent,
    PlanesComponent,
    ModalNuevaPersonaComponent,
    ModalPlaneComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,BrowserAnimationsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
