import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MessageComponent } from './message.component'
import { LoginComponent } from './login.component'
import { RegisterComponent } from './register.component'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AlwaysAuthGuard } from './login.guard';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import {TimeAgoPipe} from 'time-ago-pipe';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'users', canActivate : [AlwaysAuthGuard], component: UsersComponent},
  { path: 'messages/:type/:user',  component : MessageComponent},
  { path: 'login',
    redirectTo: '',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({ url: 'http://localhost:4000', options: {} }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
    )
  ],
  providers: [
    AlwaysAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
