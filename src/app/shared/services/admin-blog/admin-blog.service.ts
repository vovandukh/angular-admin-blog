import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBlog } from '../interfaces/blog.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBlogService {
  private url = environment.BACKEND_URL;
  private api = { blog: `${this.url}/blog` }
  constructor(private http: HttpClient) {}
  
  create(blog: IBlog): Observable<void> {
   return this.http.post<void>(this.api.blog, blog)
  }
  update(post:IBlog,id:number):Observable<void>{
    return this.http.patch<void>(`${this.api.blog}/${id}`,post)
  }
  getAll():Observable<IBlog[]>{
    return this.http.get<IBlog[]>(this.api.blog)
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.blog}/${id}`)
  }

}
