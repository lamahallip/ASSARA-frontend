
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorVO, CategoryVO, CityVO, CountryVO, DescriptionVO, Product, TitleVO, PriceVO } from '../service/model/product.model';
import { ToastService } from '../service/toast.service';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { countries } from '../shared/country.model';
import { createProductFormContent } from './add-new-product-form.model';
import { CommonModule } from '@angular/common';

type FlowStatus = 'init' | 'validation-image-error' | 'success' | 'error'

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlertModule, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.scss'
})
export class AddNewProductComponent implements OnDestroy {

  public productCreated! : Product;
  public countries: any = countries;
  public categories: string[] = ['Meuble','Boisson','Maison', 'Cuisine', 'Automobile', 'Piece',
    'Livre', 'Beauté', 'Soin personnel', 'Electronique grand public', 'Mode et Vêtement',
    'Essentiels pour la maison', 'Médias', 'Santé', 'Matériel de bureau', 'Electronique', 
    'Produits de sport', 'Jouets et Entraves', 'Vêtement et Accessoires', 'Produits du tabac',
    'Fournitures pour animaux de compagnie', 'Chaussures', 'Nourriture', 'Cosmétique'
  ];

  // private formBuilder: FormBuilder = inject(FormBuilder);
  private tosatService : ToastService = inject(ToastService);
  private productService : ProductService = inject(ProductService);
  private router: Router = inject(Router);
  createProductForm! : FormGroup; 
  

  isCreated : boolean = false;
  flowStatus: FlowStatus = 'init';


  constructor(private formBuilder: FormBuilder) {

    this.createProductForm = this.formBuilder.nonNullable.group<createProductFormContent>({
      author: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      title : new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      category: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      country : new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      city: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      description : new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      price : new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      image : new FormControl(null, {nonNullable: true, validators: [Validators.required]}),
    })
    
    effect(() => {
      this.isCreated = false;
      //console.table (this.productCreated)
      if(this.productService.addSignal().status === "OK") {
        this.tosatService.show("Product created with success", "SUCCESS");
        this.router.navigate(['/'])
      } else {
        this.tosatService.show("Error occured when created Product, please try again", "DANGER")
      }
    })
  }

  ngOnDestroy(): void {
    this.productService.reset()
  }


  // Method to create product
  create(): void {

    this.isCreated = true;

    const authorVO: AuthorVO = {value: this.createProductForm.value.author};
    const titleVO: TitleVO = {value: this.createProductForm.value.title};
    const categoryVO: CategoryVO = {value: this.createProductForm.value.category};
    const countryVO: CountryVO = {value: this.createProductForm.value.country};
    const cityVO: CityVO = {value: this.createProductForm.value.city};
    const descriptionVO: DescriptionVO = {value: this.createProductForm.value.description};
    const priceVO: PriceVO = {value: this.createProductForm.value.price}
    if(this.createProductForm.value.image === null) {
      this.flowStatus = 'validation-image-error';
    }

    this.productCreated.author = authorVO;
    this.productCreated.title = titleVO;
    this.productCreated.category = categoryVO;
    this.productCreated.country = countryVO;
    this.productCreated.city = cityVO;
    this.productCreated.description = descriptionVO;
    this.productCreated.price = priceVO;

    
    this.productService.addNewProduct(this.productCreated)
    
  }

  // Method to upload a file 
  private extractFileFromTarget(target: EventTarget | null): File | null {
    const htmlInputTarget = target as HTMLInputElement;
    if (target === null || htmlInputTarget.files === null) {
      return null
    } else {
      return htmlInputTarget.files[0];
    }
  }

  // Method to upload image using extractFileFromTarget
  uploadImage(target: EventTarget | null): void {
    const image = this.extractFileFromTarget(target);
    if(image !== null) {
      this.productCreated.image = image;
      this.productCreated.imageContentType = image.type;
    }
  }

}
