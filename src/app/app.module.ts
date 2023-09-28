import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from 'src/shared/shared.module';
import {HTTP_INTERCEPTORS,HttpClientModule} from "@angular/common/http"
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      positionClass: 'toast-bottom-right',
      disableTimeOut:true
  }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
],
})
export class AppModule { }
