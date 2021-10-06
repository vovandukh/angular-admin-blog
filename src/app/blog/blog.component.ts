import { Component, OnInit } from '@angular/core';
import { IBlog } from '../shared/interfaces/blog.interface';
import { ICategory } from '../shared/interfaces/category.inreface';
import { AdminBlogService } from '../shared/services/admin-blog/admin-blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blog:IBlog[] = []
  constructor(
    private adminService:AdminBlogService
  ) { }

  ngOnInit(): void {
  this.loadAll()
  }
  loadAll(){
    this.adminService.getAll().subscribe(data =>{
      this.blog = data;
      console.log(this.blog);
      
    })
  }
 
}
