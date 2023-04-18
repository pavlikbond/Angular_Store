import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit {
  @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();
  categories: string[] | undefined;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }
}
