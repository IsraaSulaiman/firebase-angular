import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../../../../services/order.service";
import { AuthService } from "../../../../services/auth.service";
import { Subscription, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Order } from '../../../../models/order.model';

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userId: string;
  orders: Order[];

  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit() {
    this.subscription = this.auth.user$
      .pipe(
        switchMap(user => {
          this.userId = user.uid;
          return this.orderService.getOrdersByUser(this.userId)
        })
      )
      .subscribe(orders => (this.orders = orders));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
