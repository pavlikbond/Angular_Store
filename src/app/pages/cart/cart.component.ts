import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  loading: boolean = false;
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
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((cart: Cart) => {
      this.cart = cart;
      this.dataSource = cart.items;
    });
    //check local storage for cart items
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartItems.length) {
      this.cartService.cart.next({ items: cartItems });
    }
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

  onCheckout(): void {
    //save cart items to local storage
    localStorage.setItem("cart", JSON.stringify(this.cart.items));
    this.loading = true;
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51MyLzpKPzg6RNBLXmh7cJnodgFMYbNoPZ2SPA2BochTwrUoVxj7m4yGkrcmR2obz8qwQIS8LhqZBn5e5VH9acbzA00a3Sf7l4W"
        );
        stripe?.redirectToCheckout({ sessionId: res.id });
        this.loading = false;
      });
  }
}
