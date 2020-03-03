import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, map, take } from "rxjs/operators";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(switchMap(user => this.userService.get(user.uid)))
      .pipe(
        map(user => {
          if (!user.isAdmin) {
            this.router.navigate(["/login"]);
          }

          return user.isAdmin;
        })
      );
  }
}
