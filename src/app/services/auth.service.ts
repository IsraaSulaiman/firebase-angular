import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { switchMap, share } from "rxjs/operators";
import { of } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

import { AppUser } from "../models/app-user.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<AppUser>;

  constructor(
    public gfAuth: AngularFireAuth,
    private userService: UserService
  ) {
    //Get data from the auth default => then return user doc saved in the firestore
    this.user$ = gfAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        } else {
          return of(null);
        }
      }),
      share()
    );
  }

  loginWithGoogle() {
    return this.oAuthLogin(new auth.GoogleAuthProvider());
  }

  private async oAuthLogin(provider) {
    const credential = await this.gfAuth.auth.signInWithPopup(provider);
    await this.updateUserInfo(credential.user);
    return credential;
  }

  private updateUserInfo(user) {
    // Set User Data on Login
    const userData: AppUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      isAdmin: true
    };
    return this.userService.save(userData);
  }

  logout() {
    return this.gfAuth.auth.signOut();
  }
}
