import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'projetos',
    loadChildren: () => import('./modules/projetos/projetos.module').then(m => m.ProjetosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'atividades',
    loadChildren: () => import('./modules/atividades/atividades.module').then(m => m.AtividadesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
