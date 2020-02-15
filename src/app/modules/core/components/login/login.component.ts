import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../../services/user.service";
import { AppUser } from "../../../../models/app-user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async loginWithGoogle() {
    const returnUrl = this.route.snapshot.paramMap.get("returnUrl") || "";
    await this.auth.loginWithGoogle();
    this.router.navigateByUrl(returnUrl);
    // const credential = this.auth.loginWithGoogle();
    // await this.updateUserInfo(credential.user);
  }

  private updateUserInfo(user: AppUser) {
    return this.userService.save(user);
  }
}
