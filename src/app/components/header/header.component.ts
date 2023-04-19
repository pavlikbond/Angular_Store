import { Component, Input, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.itemsQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
