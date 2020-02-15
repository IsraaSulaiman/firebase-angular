import { Component, OnInit } from "@angular/core";
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  products;
  filteredProducts: any[];;

  ngOnInit() {
    this.productsService
      .getAll()
      .subscribe(
        products => {
          (this.filteredProducts = this.products = products)
        }
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(prod =>
          prod.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
}
