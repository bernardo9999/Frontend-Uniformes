import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ComprasComponent } from './shared/widgets/forms/compras/compras.component';
import { TransportadoraComponent } from './shared/widgets/forms/transportadora/transportadora.component';
import { CdComponent } from './shared/widgets/forms/cd/cd.component';
import { FabricanteComponent } from './shared/widgets/forms/fabricante/fabricante.component';
import { FornecedorComponent } from './shared/widgets/forms/fornecedor/fornecedor.component';
import { FormUniformeComponent } from './shared/widgets/forms/uniforme/uniforme.component';

const routes: Routes = [
{  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'compras',
    component: ComprasComponent
  },
  {
    path: 'fabricante',
    component: FabricanteComponent
  },
  {
    path: 'transportadora',
    component: TransportadoraComponent
  },
  {
    path: 'cd',
    component: CdComponent
  },
  {
    path: 'fornecedor',
    component: FornecedorComponent
  },
  {
    path: 'uniforme',
    component: FormUniformeComponent
  }
]
  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
