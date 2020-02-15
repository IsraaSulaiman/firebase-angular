import { Injectable } from "@angular/core";
import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { ShoppingCartService } from "./shopping-cart.service";
import { Order } from '../models/order.model';

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(
    private gfs: AngularFirestore,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    const result = await this.gfs.collection("/orders").add({ ...order });
    await this.shoppingCartService.clearCart();
    return result;
  }

  getOrdersByUser(userId: string) {
    return this.gfs
      .collection<Order>("orders", ref =>
        ref.where("userId", "==", userId).orderBy('datePlaced', 'desc')
      )
      .valueChanges({idField: 'id'});
  }

  getOrders() {
    return this.gfs
      .collection<Order>("orders", ref => ref.orderBy("datePlaced", "desc"))
      .valueChanges({idField: 'id'});
  }
}
