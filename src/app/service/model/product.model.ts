import { enableProdMode } from "@angular/core";

export interface AuthorVO {
    value?: string;
}

export interface TitleVO {
    value?: string;
}

export interface PriceVO {
    value?: string;
}

export interface CategoryVO {
    value?: string;
}

export interface CountryVO {
    value?: string;
}

export interface CityVO {
    value?: string;
}

export interface DescriptionVO {
    value?: string;
}

export interface ProductBase {
    publicId?: string;
    title?: TitleVO;
    author?: AuthorVO;
    price?: PriceVO;
    category?: CategoryVO;
    country?: CountryVO;
    city?: CityVO;
    description?: DescriptionVO;
}

export interface Product extends ProductBase {
    image?: File;
    imageContentType?: string;
}

export interface ReadProduct extends ProductBase {
    image?: File;
    imageContentType?: string;
    favorite: boolean;
}