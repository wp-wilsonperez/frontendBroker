import { RolesComponent } from './../roles/new/roles.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { RolsListComponent } from './../roles/list/rols-list.component';
import { UserComponent } from './new/user.component';
import { UserListComponent } from './list/user-list.component';
import { DataTableModule } from "angular2-datatable";
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../theme/directives/directives.module';
export const routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'crear', component: UserComponent, data: { breadcrumb: 'Nuevo Usuario' } },
  { path: 'listado', component: UserListComponent, data: { breadcrumb: 'Listado' } },
  { path: 'nuevo_rol', component:  RolesComponent, data: { breadcrumb: 'Nuevo Rol' } },
  { path: 'roles', component:  RolsListComponent, data: { breadcrumb: 'Roles' } },


];

@NgModule({
  imports: [
 
    DataTableModule,
    PipesModule,
    DirectivesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent,UserListComponent,RolesComponent,RolsListComponent,ImageUploaderComponent
  ],
  providers: []
})
export class UserModule { 
  
}
