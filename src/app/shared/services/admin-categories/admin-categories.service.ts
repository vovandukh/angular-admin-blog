import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
 private url = environment.BACKEND_URL
 private api = {category:`${this.url}/category`}
  constructor(private http:HttpClient) { }
  create(category:ICategory):Observable<void>{
    return this.http.post<void>(this.api.category,category)
  }
  loadAll():Observable<ICategory[]>{
   return this.http.get<ICategory[]>(this.api.category)
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.category}/${id}`)
  }
  update(id:number,category:ICategory){
    return this.http.patch<void>(`${this.api.category}/${id}`,category)
  }
}
