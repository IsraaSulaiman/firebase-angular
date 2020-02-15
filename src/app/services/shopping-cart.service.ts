import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { take, switchMap, map } from "rxjs/operators";
import { Cart, Item } from '../models/shopping.model';

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private gfs: AngularFirestore) {}

  private createId() {
    return this.gfs.createId();
  }

  createCart(cartId: string) {
    return this.gfs
      .doc("shopping-carts/" + cartId)
      .set({ dateCreated: new Date().getTime() }, { merge: true });
  }

  async getCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCart();
    return this.gfs.doc<Cart>("shopping-carts/" + cartId).valueChanges(); //returns {createdDate} : data in cartId doc
  }

  async getCartWithItems(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCart();
    return (
      this.gfs
        .collection<{ product; quantity }>(
          "shopping-carts/" + cartId + "/items/"
        )
        //returns [items]: docs in items subcollection
        .valueChanges({ idField: "id" })
        .pipe(
          map(items => {
            const allItems = items.map(item => new Item({ ...item }));
            return new Cart(allItems);
          })
        )
    );
  }

  private async getOrCreateCart(): Promise<string> {
    const cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    const id = this.createId();
    await this.createCart(id);
    localStorage.setItem("cartId", id);
    return id;
  }

  getProductItem(cartId, productId) {
    return this.gfs
      .doc<Item>("shopping-carts/" + cartId + "/items/" + productId)
      .snapshotChanges();
  }

  addToCart(product: Product): Promise<Observable<void>> {
    return this.updateItem(product, 1);
  }

  removeFromCart(product: Product): Promise<Observable<void>> {
    return this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCart();
    await this.gfs.doc("shopping-carts/" + cartId);
    await this.deleteSubCollection(cartId).subscribe(async promises => {
      await Promise.all(promises);
    });
  }

  deleteItem(cartId, itemId): Promise<void> {
    return this.gfs
      .doc("shopping-carts/" + cartId + "/items/" + itemId)
      .delete();
  }

  deleteSubCollection(cartId) {
    return this.gfs
      .collection("shopping-carts/" + cartId + "/items/")
      .get()
      .pipe(
        map(snapshot =>
          snapshot.docs.map(doc => this.deleteItem(cartId, doc.id))
        )
      );
  }

  private async updateItem(
    product: Product,
    change: number
  ): Promise<Observable<void>> {
    const cartId = await this.getOrCreateCart();
    const doc$ = this.getProductItem(cartId, product.id);
    return doc$.pipe(
      take(1),
      switchMap(async item => {
        let quantity = item.payload.data()
          ? item.payload.data().quantity + change
          : 0 + change;

        if (quantity == 0) {
          await this.deleteItem(cartId, product.id);
          return;
        }

        return this.gfs
          .doc("shopping-carts/" + cartId + "/items/" + product.id)
          .set(
            {
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: quantity
            },
            { merge: true }
          );
      })
    );
  }
}
