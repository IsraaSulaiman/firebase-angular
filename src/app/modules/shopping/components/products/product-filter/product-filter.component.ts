import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"]
})
export class ProductFilterComponent {
  @Input("category") category: string;
  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }
}
