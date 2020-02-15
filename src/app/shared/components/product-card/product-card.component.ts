import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../../models/product.model";
import { ShoppingCartService } from "../../../services/shopping-cart.service";
import { Cart } from '../../../models/shopping.model';

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions: boolean = true;
  @Input("shopping-cart") shoppingCart: Cart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  async addToCart() {
    (await this.shoppingCartService.addToCart(this.product)).subscribe(item => {
      console.log("added");
    });
  }
}
