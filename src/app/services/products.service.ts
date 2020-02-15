import { Injectable } from "@angular/core";
import "firebase/firestore";
import {
  AngularFirestore,
  DocumentReference
} from "@angular/fire/firestore";
import {from, Observable } from "rxjs";

import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private gfs: AngularFirestore) {}

  create(product):Observable<DocumentReference> {
    return from(this.gfs.collection<Product>("/products").add(product));
  }

  getAll(): Observable<Product[]> {
    return this.gfs
      .collection<Product>("products")
      .valueChanges({ idField: "id" });
  }

  get(id): Observable<Product> {
    return this.gfs.doc<Product>("products/" + id).valueChanges();
  }

  update(productId, product): Observable<void> {
    return from(this.gfs.doc<Product>("products/" + productId).update(product));
  }

  delete(id): Observable<void> {
    return from(this.gfs.doc<Product>("/products/" + id).delete());
  }
}
