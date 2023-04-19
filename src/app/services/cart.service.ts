import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>(this.checkLocalStorage());
  constructor(private _snackBar: MatSnackBar) {
    this.cart.subscribe((cart) => {
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  }

  checkLocalStorage(): Cart {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    } else {
      return { items: [] };
    }
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((i) => i.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("Item added to cart", "Ok", { duration: 3000 });
  }

  getTotal(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart(snack = true): void {
    this.cart.next({ items: [] });
    if (snack) {
      this._snackBar.open("Cart cleared", "Ok", { duration: 3000 });
    }
  }

  removeFromCart(item: CartItem): void {
    const filterItems = this.cart.value.items.filter((i) => i.id !== item.id);
    this.cart.next({ items: filterItems });
    this._snackBar.open("Item removed from cart", "Ok", { duration: 3000 });
  }

  reduceQuantity(item: CartItem): void {
    for (let _item of this.cart.value.items) {
      if (_item.id === item.id) {
        _item.quantity -= 1;
        this._snackBar.open("Item quantity reduced", "Ok", { duration: 3000 });
        this.cart.next({ items: this.cart.value.items });
      }
      if (_item.quantity === 0) {
        this.removeFromCart(_item);
      }
    }
  }

  loadCart(items: CartItem[]): void {
    this.cart.next({ items });
  }
}
