import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/interfaces/category/category.interface';
import { AdminBlogService } from 'src/app/shared/services/admin-blog/admin-blog.service';
import { AdminCategoriesService } from 'src/app/shared/services/admin-categories/admin-categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categoryForm!: FormGroup;
  public id = Math.round(Math.random() * 1000);
  public category: ICategory[] = [];
  public curentIDCategory!: number;
  public editStatus = false;
  public idCategory!:number;
  public filterCategory = '';

  constructor(
    private adminCategory: AdminCategoriesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initCategory();
  }
  initCategory() {
    this.categoryForm = this.fb.group({
      id: this.id,
      name: [null, Validators.required]
    })
  }
  createCategory() {
    if (this.editStatus) {
      this.adminCategory.update(this.curentIDCategory, this.categoryForm.value).subscribe(() => {
        this.loadCategory();
        this.initCategory();
        this.editStatus = false;
      }, err =>{
        console.log('update category error');
      })
    } else {
      this.adminCategory.create(this.categoryForm.value).subscribe(() => {
        this.loadCategory()
        this.initCategory()
      }, err => {
        console.log('create category error');

      })
    }
  }

  loadCategory() {
    this.adminCategory.loadAll().subscribe(data => {
      this.category = data;
    })
  }

  deleteCategory() {
    this.adminCategory.delete(this.idCategory).subscribe(() => {
      this.loadCategory()
    }, err => {
      console.log('delete category error');
    })
  }
  editCategory(category: ICategory) {
    this.categoryForm.patchValue({
      name: category.name
    })
    this.curentIDCategory = category.id
    this.editStatus = true;
  }
  openModal(id:number){
    this.idCategory = id;
  }

}
