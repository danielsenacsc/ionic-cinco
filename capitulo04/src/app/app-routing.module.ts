import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/ordensdeservico/listagem/ordensdeservico-listagem.module').then(m => m.OrdensDeServicoListagemPageModule) },
  { path: 'add-edit/:id', loadChildren: () => import('./pages/pecas/add-edit/pecas-add-edit.module').then(m => m.PecasAddEditPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
