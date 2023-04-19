import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styles: [],
})
export class SuccessComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //check local storage for cart and delete it if found
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartItems.length) {
      localStorage.removeItem("cart");
    }
  }
}
