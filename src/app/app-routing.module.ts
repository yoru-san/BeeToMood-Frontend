import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupAddComponent } from './group/group-add/group-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { ParameterComponent } from './parameter/parameter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IsLoggedGuard } from './is-logged.guard';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [IsLoggedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'group', component: GroupListComponent },
  { path: 'group/add', component: GroupAddComponent },
  { path: 'user', component: UserListComponent },
  { path: 'user/add', component: UserAddComponent },
  { path: 'parameters', component: ParameterComponent },          
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsLoggedGuard]
})
export class AppRoutingModule { }
