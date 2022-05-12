import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SideMenuPage } from './sidemenu.page';
import { SideMenuRoutingModule } from './sidemenu-routing.module';
import { OrdensDeServicoListagemPageModule } from '../ordensdeservico/listagem/ordensdeservico-listagem.module';
import { OrdensDeServicoAddEditPageModule } from '../ordensdeservico/add-edit/ordensdeservico-add-edit.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SideMenuRoutingModule,
        OrdensDeServicoListagemPageModule,
        OrdensDeServicoAddEditPageModule
    ],
    declarations: [SideMenuPage]
})
export class SideMenuPageModule { }
