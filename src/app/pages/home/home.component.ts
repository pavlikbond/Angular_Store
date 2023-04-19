import { CartService } from "./../../services/cart.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] | undefined;
  sort: string = "desc";
  count: string = "12";
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) {}
  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((products) => {
        this.products = products;
      });
  }

  onColumnsCountChange(newColumns: number): void {
    this.cols = newColumns;
    this.rowHeight = ROWS_HEIGHT[newColumns];
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(newItemsCount: number): void {
    this.count = newItemsCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
