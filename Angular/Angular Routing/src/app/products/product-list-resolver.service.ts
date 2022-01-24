import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductListResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<ProductListResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductListResolved | Observable<ProductListResolved> | Promise<ProductListResolved> {
    return this.productService.getProducts()
      .pipe(
        map((products: Product[]) => ({products: products})),
        catchError(error => {
          const message = `Retrieval error ${error}`;
          console.error(message);
          return of({products: null, error: message});
        })
      );
  }
}
