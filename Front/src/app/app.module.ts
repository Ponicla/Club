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
import { ServiciosComponent } from './components/admin/servicios/servicios.component';
import { ModalServiciosComponent } from './components/modal/modal-servicios/modal-servicios.component';
import { PlanComponent } from './components/plan/plan.component';
import { PagoComponent } from './components/pago/pago.component';
import { ContratarServicioComponent } from './components/contratar-servicio/contratar-servicio.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CanchasComponent } from './components/admin/canchas/canchas.component';
import { PaseosComponent } from './components/admin/paseos/paseos.component';
import { ComerciosComponent } from './components/admin/comercios/comercios.component';
import { DevolucionPagoComponent } from './components/devolucion-pago/devolucion-pago.component';
import { MisServiciosComponent } from './components/mis-servicios/mis-servicios.component';
import { ModalNewUseradminComponent } from './components/modal/modal-new-useradmin/modal-new-useradmin.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import 'firebase/auth';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { DevolucionPagoServicioComponent } from './components/devolucion-pago-servicio/devolucion-pago-servicio.component';
import { MisPaseosComponent } from './components/mis-paseos/mis-paseos.component';
import { DevolucionPagoPaseoComponent } from './components/devolucion-pago-paseo/devolucion-pago-paseo.component';
import { DevolucionPagoErrorComponent } from './components/devolucion-pago-error/devolucion-pago-error.component';

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
    ModalPlaneComponent,
    ServiciosComponent,
    ModalServiciosComponent,
    PlanComponent,
    PagoComponent,
    ContratarServicioComponent,
    CanchasComponent,
    PaseosComponent,
    ComerciosComponent,
    DevolucionPagoComponent,
    MisServiciosComponent,
    ModalNewUseradminComponent,
    ReportesComponent,
    DevolucionPagoServicioComponent,
    MisPaseosComponent,
    DevolucionPagoPaseoComponent,
    DevolucionPagoErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
