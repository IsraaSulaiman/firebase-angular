import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomFormsModule } from "ng2-validation";

import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductQuantityComponent } from "./components/product-quantity/product-quantity.component";




@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    CustomFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule
  ]
})
export class SharedModule {}
