import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(limit = "12", sort = "desc"): Observable<Product[]> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products?limit=${limit}&sort=${sort}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/products/categories`);
  }
}
