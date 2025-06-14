export interface ProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    categoryName: string;
    imageUrls: string[];
    isFavorite:boolean
    colors: ProductColorDto[];
    selections: { [key: string]: number | null }; 

}

export interface ProductColorDto {
    name: string;
    hexCode: string;
}

export interface BasketProduct {
    Id?:number
    ProductId?: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number; // for +/-
    selections: { [key: string]: string | null }; 
  }