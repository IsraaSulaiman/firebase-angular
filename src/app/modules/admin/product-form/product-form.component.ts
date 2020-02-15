import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Category, CategoryService } from 'src/app/services/category.service';

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$ : Observable<Category[]>
  product = {title: '', imageUrl: '', price: '', category: '' };
  id:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    //Edit Product
    this.id = this.route.snapshot.paramMap.get("id");
    if(!this.id) return;
    
    this.productsService
      .get(this.id)
      .pipe(take(1))
      .subscribe(product => {
        this.product = product;
      });
  }

  save(product) {
    //update
    if (this.id) this.productsService.update(this.id, product);
    //Create
    else this.productsService.create(product);

    this.router.navigate(["/admin/products"]);
  }

  delete(){
    if(!confirm('Are you sure you want to delete the item?')) return;
    this.productsService.delete(this.id);
    this.router.navigate(["/admin/products"])
  }
}
