import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDto } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(protected http: HttpClient) {}

  getProduct(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${environment.apiUrl}/Product`);
  }

  getProductById(id:number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${environment.apiUrl}/Product/${id}`);
  }
  // POST
  postData(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/items`, payload);
  }

  AddFavorite(entity:any): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/Product/AddFavoriteProduct`,entity);
  }

  RemoveFavorite(Id:any): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/Product/RemoveFavoriteProduct/`+Id,);
  }
  GetFavoriteProductFavorite(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${environment.apiUrl}/Product/GetFavoriteProduct/`);
  }

}
