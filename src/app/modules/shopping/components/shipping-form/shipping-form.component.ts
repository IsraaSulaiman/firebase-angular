import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import { OrderService } from "../../../../services/order.service";
import { Subscription } from "rxjs";
import { Order } from '../../../../models/order.model';
import { Cart } from '../../../../models/shopping.model';

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  @Input("shopping-cart") cart: Cart;
  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(appUser => {
      this.userId = appUser.uid;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.shipping, this.cart, this.userId);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.id]);
  }
}
