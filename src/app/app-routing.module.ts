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
import { IsAllowedGuard } from './is-allowed.guard';



const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [IsLoggedGuard] },
  { path: 'group', component: GroupListComponent, canActivate: [IsLoggedGuard, IsAllowedGuard] },
  { path: 'group/add', component: GroupAddComponent, canActivate: [IsLoggedGuard, IsAllowedGuard] },
  { path: 'user', component: UserListComponent, canActivate: [IsLoggedGuard, IsAllowedGuard] },
  { path: 'user/add', component: UserAddComponent, canActivate: [IsLoggedGuard, IsAllowedGuard] },
  { path: 'parameters', component: ParameterComponent, canActivate: [IsLoggedGuard] },
  { path: 'login', component: LoginComponent },          
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsLoggedGuard]
})
export class AppRoutingModule { }
