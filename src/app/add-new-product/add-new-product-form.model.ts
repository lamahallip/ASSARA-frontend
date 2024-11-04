import { FormControl } from "@angular/forms";

export type createProductFormContent = {
    author: FormControl<string>;
    title: FormControl<string>;
    price: FormControl<string>;
    category: FormControl<string>;
    country: FormControl<string>;
    city: FormControl<string>;
    description: FormControl<string>;
    image: FormControl<File | null>;
}