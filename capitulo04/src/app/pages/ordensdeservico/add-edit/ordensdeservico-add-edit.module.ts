import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdensDeServicoAddEditPage } from './ordensdeservico-add-edit.page';

const routes: Routes = [
    {
        path: '',
        component: OrdensDeServicoAddEditPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [OrdensDeServicoAddEditPage]
})
export class OrdensDeServicoAddEditPageModule { }
