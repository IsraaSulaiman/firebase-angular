import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../../models/product.model";
import { ShoppingCartService } from "../../../services/shopping-cart.service";
import { Cart } from '../../../models/shopping.model';

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"]
})
export class ProductQuantityComponent {
  @Input("product") product: Product;
  @Input("shopping-cart") shoppingCart: Cart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  async addToCart() {
    (await this.shoppingCartService.addToCart(this.product)).subscribe(item => {
      console.log("added");
    });
  }

  async removeFromCart() {
    (await this.shoppingCartService.removeFromCart(this.product)).subscribe(
      item => {
        console.log("removed");
      }
    );
  }
}
