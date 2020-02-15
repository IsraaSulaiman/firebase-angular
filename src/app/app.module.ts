import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { AdminModule } from "./modules/admin/admin.module";
import { LoginComponent } from "./modules/core/components/login/login.component";
import { CoreModule } from "./modules/core/core.module";
import { ProductsComponent } from "./modules/shopping/components/products/products.component";
import { ShoppingModule } from "./modules/shopping/shopping.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      { path: "", component: ProductsComponent, pathMatch: "full" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
