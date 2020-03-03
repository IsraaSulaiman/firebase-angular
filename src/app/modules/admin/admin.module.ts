import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { OrderDetailsComponent } from "src/app/shared/components/order-details/order-details.component";
import { AuthGuard } from "src/app/services/auth.guard";
import { AdminAuthGuard } from "src/app/services/admin-auth-guard.service";

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "admin/orders/:id",
        component: OrderDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class AdminModule {}
