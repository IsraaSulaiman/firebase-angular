import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: "app-admin-orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.css"]
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }
}
