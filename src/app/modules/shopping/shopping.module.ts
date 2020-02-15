import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./components/products/products.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { ProductFilterComponent } from "./components/products/product-filter/product-filter.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { ShoppingCartSummaryComponent } from "./components/shopping-cart-summary/shopping-cart-summary.component";
import { ShippingFormComponent } from "./components/shipping-form/shipping-form.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDetailsComponent } from 'src/app/shared/components/order-details/order-details.component';
import { AuthGuard } from 'src/app/services/auth.guard';

@NgModule({
  declarations: [
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "my/orders/:id",
        component: OrderDetailsComponent
        // canActivate: [AuthGuard]
      },
      {
        path: "my/orders",
        component: MyOrdersComponent
        // canActivate: [AuthGuard]
      },
      { path: "products", component: ProductsComponent },
      {
        path: "shopping-cart",
        component: ShoppingCartComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "check-out",
        component: CheckOutComponent
        // canActivate: [AuthGuard]
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent
        // canActivate: [AuthGuard]
      }
    ])
  ]
})
export class ShoppingModule {}
