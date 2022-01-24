import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {

    constructor(private productService: ProductService) {}

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    filteredProducts: IProduct[] = [];
    errorMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }

    products: IProduct[] = [];

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    onRatingClicked(message: string): void {
        this.pageTitle += ' : ' + message;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = products;
            },
            error: err => this.errorMessage = err
        });
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}