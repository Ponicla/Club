import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrerComponent } from './components/user/registrer/registrer.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { PlanesComponent } from './components/admin/planes/planes.component';
import { ServiciosComponent } from './components/admin/servicios/servicios.component';
import { AuthGuard } from './guards/auth.guard';
import { PlanComponent } from './components/plan/plan.component';
import { PagoComponent } from './components/pago/pago.component';
import { ContratarServicioComponent } from './components/contratar-servicio/contratar-servicio.component';
import { CanchasComponent } from './components/admin/canchas/canchas.component';
import { PaseosComponent } from './components/admin/paseos/paseos.component';
import { ComerciosComponent } from './components/admin/comercios/comercios.component';
import { DevolucionPagoComponent } from './components/devolucion-pago/devolucion-pago.component';
import { MisServiciosComponent } from './components/mis-servicios/mis-servicios.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { DevolucionPagoServicioComponent } from './components/devolucion-pago-servicio/devolucion-pago-servicio.component';
import { MisPaseosComponent } from './components/mis-paseos/mis-paseos.component';

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "admin/usuarios", component: UsuariosComponent, canActivate: [AuthGuard] },
  {path: "admin/planes", component: PlanesComponent, canActivate: [AuthGuard]},
  {path: "admin/servicios", component: ServiciosComponent, canActivate: [AuthGuard] },
  {path: "user/login", component: LoginComponent },
  {path: "user/registrer", component: RegistrerComponent },
  {path: "user/profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {path: "plan/:id", component: PlanComponent, canActivate: [AuthGuard] },
  {path: "plan/:id/pago", component: PagoComponent , canActivate: [AuthGuard] },
  {path: "user/contratar-servicio/:id", component: ContratarServicioComponent , canActivate: [AuthGuard] },
  {path: "admin/canchas", component: CanchasComponent , canActivate: [AuthGuard] },
  {path: "admin/paseos", component: PaseosComponent , canActivate: [AuthGuard] },
  {path: "admin/comercios", component: ComerciosComponent , canActivate: [AuthGuard] },
  {path: "user/pago_s", component: DevolucionPagoComponent , canActivate: [AuthGuard] },
  {path: "user/pago_c", component: DevolucionPagoServicioComponent , canActivate: [AuthGuard] },
  {path: "user/mis_servicios", component: MisServiciosComponent , canActivate: [AuthGuard] },
  {path: "admin/reportes", component: ReportesComponent , canActivate: [AuthGuard] },
  {path: "user/mis_paseos", component: MisPaseosComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
