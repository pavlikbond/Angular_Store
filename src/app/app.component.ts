import { Component, OnInit } from "@angular/core";
import { Cart } from "./models/cart.model";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  template: `<app-header></app-header> <router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });
  }
  cart: Cart = { items: [] };
}
