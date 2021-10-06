import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { AdminBlogService } from 'src/app/shared/services/admin-blog/admin-blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {
  public adminBlog: IBlog[] = [];
  public id = Math.round(Math.random() * 1000);
  public postForm!: FormGroup;
  public imagePath = 'https://media.istockphoto.com/photos/pepperoni-pizza-on-wooden-table-picture-id1301482898?b=1&k=20&m=1301482898&s=170667a&w=0&h=XLgT9kG_7_n02S-YzOY71EzcGgqBnY-GukEfhjOui64=';
  public date = new Date;
  public editStatus = false;
  public curentId!: number;
  close: any;
  constructor(
    private blogServise: AdminBlogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadPost()
    this.initPost()
  }
  initPost() {
    this.postForm = this.fb.group({
      id: this.id,
      title: [null, Validators.required],
      description: [null, Validators.required],
      author: [null, Validators.required],
      imagePath: this.imagePath,
      date: this.date.toDateString().slice(4, 15)
    })
  }

  createBlog(): void {
    if (this.editStatus) {
      this.blogServise.update(this.postForm.value, this.curentId).subscribe(() => {
        this.loadPost()
        this.initPost()
        this.editStatus = false
      }, err => {
        console.log('edit post error');
      })
    } else {
      this.blogServise.create(this.postForm.value).subscribe(() => {
        this.loadPost()
        this.initPost()
      }, err => {
        console.log('create post error');
      })
    }
  }
  loadPost() {
    this.blogServise.getAll().subscribe(data => {
      this.adminBlog = data;
    }, err => {
      console.log('load blog error');
    })
  }
  savePost(): void {
    console.log(this.postForm);

  }
  deletePost(item: IBlog) {
    console.log(item.id);
    this.blogServise.delete(item.id).subscribe(() => {
      this.loadPost();
    }, err => {
      console.log('delete blog error');
    })
  }
  editPost(item: IBlog): void {
    this.postForm.patchValue({
      title: item.title,
      description: item.description,
      author: item.author
    })
    this.curentId = item.id;
    this.editStatus = true;
  }
}
