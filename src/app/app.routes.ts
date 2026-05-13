import { Routes } from '@angular/router';
import { Login } from './login/login';
import { CriarConta } from './criar-conta/criar-conta';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { CadastroAluno } from './cadastro-aluno/cadastro-aluno';
import { Aulas } from './aulas/aulas';
import { Pagamentos } from './pagamentos/pagamentos';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'registrar',
    component: CriarConta
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboard
  },
  {
    path: 'admin/cadastro-aluno',
    component: CadastroAluno
  },
  {
    path: 'admin/aulas',
    component: Aulas
  },
  {
    path: 'admin/pagamentos',
    component: Pagamentos
  }
];
