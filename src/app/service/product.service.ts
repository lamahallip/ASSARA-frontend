import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { State } from './model/state.model';
import { Product } from './model/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http : HttpClient = inject(HttpClient)

  add$ : WritableSignal<State<Product, HttpErrorResponse>> = 
    signal(State.Builder<Product, HttpErrorResponse>().forInit().build());

  addSignal: Signal<State<Product, HttpErrorResponse>> = computed(() => this.add$());

  addSong(product : Product) : void {
    const formData = new FormData();
    formData.append('image', product.image!);
    const clone = structuredClone(product);
    clone.image = undefined;
    formData.append('dto', JSON.stringify(clone));
    this.http.post<Product>(`${environment.API_URL}/api/songs`, formData).subscribe({
      next: (product: Product) => this.add$.set(State.Builder<Product, HttpErrorResponse>().forSuccess(product).build()),
      error: (error: HttpErrorResponse) => this.add$.set(State.Builder<Product, HttpErrorResponse>().forError(error).build())
    })
  }

  reset() : void {
    this.add$.set(State.Builder<Product, HttpErrorResponse>().forInit().build())
  }



  constructor() { }
}
