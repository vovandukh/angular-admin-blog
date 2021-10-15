import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../interfaces/products/products.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
 private url = environment.BACKEND_URL
  private api = {products:`${this.url}/products`}

  constructor(
    private http:HttpClient
  ) { }
  addProduct(product:IProduct):Observable<void>{
    return this.http.post<void>(this.api.products, product);
  }
  loadProduct():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.api.products)
  }
  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.products}/${id}`)
  }
  updateProduct(id:number,product:IProduct){
    return this.http.patch<void>(`${this.api.products}/${id}`,product)
  }
}
