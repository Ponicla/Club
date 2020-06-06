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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
