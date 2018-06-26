import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { ReviewAddComponent } from './review/review-add/review-add.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupAddComponent } from './group/group-add/group-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { ParameterComponent } from './parameter/parameter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsAllowedGuard } from './guards/is-allowed.guard';
import { FirstConnexionGuard } from './guards/first-connexion.guard';



const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'review', component: ReviewListComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard] },
  { path: 'review/:id', component: ReviewListComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard] },
  { path: 'review/add', component: ReviewAddComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard] },
  { path: 'group', component: GroupListComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard, IsAllowedGuard] },
  { path: 'group/add', component: GroupAddComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard, IsAllowedGuard] },
  { path: 'group/edit/:id', component: GroupAddComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard, IsAllowedGuard] },
  { path: 'user', component: UserListComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard, IsAllowedGuard] },
  { path: 'user/add', component: UserAddComponent, canActivate: [IsLoggedGuard, FirstConnexionGuard, IsAllowedGuard] },
  { path: 'user/edit/:id', component: UserAddComponent, canActivate: [IsLoggedGuard, IsAllowedGuard] },
  { path: 'parameters', component: ParameterComponent },
  { path: 'login', component: LoginComponent },          
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsLoggedGuard, IsAllowedGuard, FirstConnexionGuard]
})
export class AppRoutingModule { }
