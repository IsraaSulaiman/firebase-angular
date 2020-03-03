import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { take, tap, map, catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    if (!this.auth.user$) {
      this.router.navigate(["/login"]);

      return of(false);
    }

    return this.auth.user$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(["/login"]);

          return false;
        }

        return true;
      })
    );
  }
}
