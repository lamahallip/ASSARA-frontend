import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

export const routes: Routes = [
    {
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: 'add-new-product',
        component: AddNewProductComponent
    }
];
