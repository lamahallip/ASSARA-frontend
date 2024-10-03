import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { State } from './model/state.model';
import { Product } from './model/product.model';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // API_URL_BASE : string = 'localhost:8090'

  http : HttpClient = inject(HttpClient)

  // this is signal for state
  add$ : WritableSignal<State<Product, HttpErrorResponse>> = 
    signal(State.Builder<Product, HttpErrorResponse>().forInit().build());
    
  addSignal: Signal<State<Product, HttpErrorResponse>> = computed(() => this.add$());

  // Method to add product to backend api
  addProduct(product : Product) : void {
    const formData = new FormData();
    formData.append('image', product.image!);
    const clone = structuredClone(product);
    clone.image = undefined;
    formData.append('dto', JSON.stringify(clone));
    console.log(formData)
    this.http.post<Product>(`${environment.API_URL}/api/products`, formData).subscribe({
      next: (product: Product) => this.add$.set(State.Builder<Product, HttpErrorResponse>().forSuccess(product).build()),
      error: (error: HttpErrorResponse) => this.add$.set(State.Builder<Product, HttpErrorResponse>().forError(error).build())
    })
  }

  addNewProduct(product: Product) : Observable<Product> {
    return this.http.post<Product>(`${environment.API_URL}/api/products`, product, { headers: new HttpHeaders({'Content-Type':  'application/json'})} ).pipe()
  }

  reset() : void {
    this.add$.set(State.Builder<Product, HttpErrorResponse>().forInit().build())
  }

  constructor() { }
}
