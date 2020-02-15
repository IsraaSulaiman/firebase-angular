import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { AppUser } from "../../../../models/app-user.model";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Cart } from '../../../../models/shopping.model';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(
    public auth: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCartWithItems();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(["/"]);
  }
}
