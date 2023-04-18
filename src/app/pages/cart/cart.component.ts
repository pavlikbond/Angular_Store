import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/200",
        name: "sneakers",
        price: 150,
        quantity: 2,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/200",
        name: "snakes",
        price: 150,
        quantity: 3,
        id: 2,
      },
    ],
  };

  dataSource: CartItem[] = [];
  displayedColumns: string[] = ["product", "name", "price", "quantity", "total", "action"];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((cart: Cart) => {
      this.cart = cart;
      this.dataSource = cart.items;
    });
  }

  getTotal(items: CartItem[]) {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onReduceQuantity(item: CartItem): void {
    this.cartService.reduceQuantity(item);
  }
}
