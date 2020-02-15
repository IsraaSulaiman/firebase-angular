import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, BsNavbarComponent],
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [BsNavbarComponent]
})
export class CoreModule {}
