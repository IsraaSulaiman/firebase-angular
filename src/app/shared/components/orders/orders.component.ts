import { Component, OnInit, Input } from "@angular/core";
import { Order } from '../../../models/order.model';

@Component({
  selector: "orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  @Input("orders") orders: Order[];
  @Input("url") url: string;

  constructor() {}

  ngOnInit() {}
}
