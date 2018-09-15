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


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'users', canActivate : [AlwaysAuthGuard], component: UsersComponent},
  { path: 'messages/:session',  component : MessageComponent},
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
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({ url: 'http://localhost:8988', options: {} }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AlwaysAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
