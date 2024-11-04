import { Component, effect, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '../service/product.service';
import { ToastService } from '../service/toast.service';
import { ReadProduct } from '../service/model/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private productService : ProductService = inject(ProductService);
  private toastService: ToastService = inject(ToastService);

  allProducts : Array<ReadProduct> | undefined ;

  constructor() {
    effect(() => {
      const allProductsResponse = this.productService.getAllSignal()
      if(allProductsResponse.status === 'OK') {
        this.allProducts = allProductsResponse.value;
      } else if(allProductsResponse.status === 'ERROR') {
        this.toastService.show("An error occured when fetching all products", "DANGER")
      }
    })
  }

  ngOnInit(): void {
    this.productService.getAll();
  }

}
