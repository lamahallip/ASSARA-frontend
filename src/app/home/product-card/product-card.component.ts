import { Component, input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReadProduct } from '../../service/model/product.model';
import { flip } from '@popperjs/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit  {
  
  product = input.required<ReadProduct>();
  productDisplay: ReadProduct = {favorite : false}
  
  ngOnInit(): void {
    this.productDisplay = this.product();
  }

}
