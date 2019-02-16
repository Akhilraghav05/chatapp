import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppService } from "./app.service";
import { AppComponent } from "./app.component";
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { LoginComponent } from "./user/login/login.component";

import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule,
    ChatModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
      { path: "login", component: LoginComponent, pathMatch: "full" },
      { path: "", component: LoginComponent, pathMatch: "full" },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
