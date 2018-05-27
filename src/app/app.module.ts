import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/shared/user.service';
import { UserAddComponent } from './user/user-add/user-add.component';;
import { ReviewAddComponent } from './review/review-add/review-add.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { ReviewService } from './review/shared/review.service';
import { GroupService } from './group/shared/group.service';
import { GroupListComponent } from './group/group-list/group-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserAddComponent,
    ReviewAddComponent,
    ReviewListComponent,
    GroupListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, ReviewService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
