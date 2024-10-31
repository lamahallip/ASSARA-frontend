import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { State } from './model/state.model';
import { Product, ReadProduct } from './model/product.model';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http : HttpClient = inject(HttpClient)

  // this is signal for state
  private add$ : WritableSignal<State<Product, HttpErrorResponse>> = 
    signal(State.Builder<Product, HttpErrorResponse>().forInit().build());
    
  addSignal: Signal<State<Product, HttpErrorResponse>> = computed(() => this.add$());

  private getAll$ : WritableSignal<State<Array<ReadProduct>, HttpErrorResponse>> =
    signal(State.Builder<Array<ReadProduct>, HttpErrorResponse>().forInit().build());
  
  getAllSignal: Signal<State<Array<ReadProduct>, HttpErrorResponse>> = computed(() => this.getAll$());

  // Method to add product to backend api
  addNewProduct(product : Product) : void {
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


  reset() : void {
    this.add$.set(State.Builder<Product, HttpErrorResponse>().forInit().build())
  }


  getAll() : void {
    this.http.get<Array<ReadProduct>>(`${environment.API_URL}/api/products`).subscribe({
      next: (products : ReadProduct[]) => this.getAll$.set(State.Builder<Array<ReadProduct>, HttpErrorResponse>().forSuccess(products).build()),
      error: (err : HttpErrorResponse) => this.getAll$.set(State.Builder<Array<ReadProduct>, HttpErrorResponse>().forError(err).build())
    })
  }

  constructor() {}
}
