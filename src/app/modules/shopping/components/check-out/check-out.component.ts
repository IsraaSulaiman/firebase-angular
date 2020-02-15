import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCartService } from "../../../../services/shopping-cart.service";
import { Subscription, Observable } from "rxjs";
import { Cart } from '../../../../models/shopping.model';

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"]
})
export class CheckOutComponent implements OnInit {
  cartSubscription: Subscription;
  cart$: Observable<Cart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    //get shoppingitems
    this.cart$ = await this.shoppingCartService.getCartWithItems();
  }
}
