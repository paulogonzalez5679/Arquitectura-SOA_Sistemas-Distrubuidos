import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ListProdComponent } from './list-prod/list-prod.component';
import { SortnamePipe } from './list-prod/sortname.pipe';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockComponent,
        ListProdComponent,
        SortnamePipe,

    ]
})

export class PagesModule {}
