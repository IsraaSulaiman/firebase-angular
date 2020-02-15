import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

export interface Category {
  name: string;
  id: string;
}

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private fs: AngularFirestore) {}

  getAll(): Observable<Category[]> {
    return this.fs.collection<Category>("/categories").valueChanges({idField: 'id'});
  }
}
