import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, concatMap, mergeMap, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  suppliers$ = this.http.get<Supplier[]>(`${this.suppliersUrl}`)
    .pipe(
      tap(suppliers => console.log('Suppliers', JSON.stringify(suppliers))),
      catchError(err => this.handleError(err)),
      shareReplay(1)
    );

  supplierWithConcatMap = of(1, 5, 8)
    .pipe(
      tap(id => console.log('Concat Map source Observable', id)),
      concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  supplierWithMergeMap = of(1, 5, 8)
    .pipe(
      tap(id => console.log('Merge Map source Observable', id)),
      mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  supplierWithSwitchMap = of(1, 5, 8)
    .pipe(
      tap(id => console.log('Switch Map source Observable', id)),
      switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  constructor(private http: HttpClient) { 
    // this.supplierWithConcatMap.subscribe(item => console.log('Concat map result', item));
    // this.supplierWithMergeMap.subscribe(item => console.log('Merge map result', item));
    // this.supplierWithSwitchMap.subscribe(item => console.log('Switch map result', item));
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
