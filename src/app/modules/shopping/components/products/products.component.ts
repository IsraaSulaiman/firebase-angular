import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { Observable } from "rxjs";
import { Product } from "../../../../models/product.model";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from "../../../../services/shopping-cart.service";
import { Cart } from '../../../../models/shopping.model';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<Cart>;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCartWithItems();
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter(product => product.category == this.category)
      : this.products;
  }

  private populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");
        this.applyFilter();
      });
  }
}
