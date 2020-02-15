import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { take, tap, map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(["/login"]);
          return false;
        }
        return true;
      })
    );
  }
}
