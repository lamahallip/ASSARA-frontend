import { Routes } from '@angular/router';

import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'add-new-product',
        component: AddNewProductComponent
    }
];
