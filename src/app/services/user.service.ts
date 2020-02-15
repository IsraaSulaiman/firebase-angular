import { Injectable } from "@angular/core";
import { AppUser } from "../models/app-user.model";
import { Observable, from } from "rxjs";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private gfs: AngularFirestore) {}

  save({ email, displayName, uid }: AppUser) {
    const userDoc: AngularFirestoreDocument = this.gfs.doc<AppUser>(
      "users/" + uid
    );
    const data = {
      uid,
      email,
      displayName,
      isAdmin: false
    };
    return userDoc.set(data, { merge: true });
  }

  get(uid: string): Observable<AppUser> {
    return this.gfs.doc<AppUser>("users/" + uid).valueChanges();
  }
}
