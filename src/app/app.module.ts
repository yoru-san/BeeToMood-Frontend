import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';


import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/shared/user.service';
import { UserAddComponent } from './user/user-add/user-add.component';;
import { ReviewAddComponent } from './review/review-add/review-add.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { ReviewService } from './review/shared/review.service';
import { GroupService } from './group/shared/group.service';
import { GroupListComponent } from './group/group-list/group-list.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ParameterService } from './parameter/shared/parameter.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/shared/login.service';
import { GroupAddComponent } from './group/group-add/group-add.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserAddComponent,
    ReviewAddComponent,
    ReviewListComponent,
    GroupListComponent,
    HeaderComponent,
    ParameterComponent,
    LoginComponent,
    GroupAddComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    DlDateTimePickerDateModule
  ],
  providers: [UserService, ReviewService, GroupService, LoginService, ParameterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
