import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/interfaces/category/category.interface';
import { IProduct } from 'src/app/shared/interfaces/products/products.interface';
import { AdminCategoriesService } from 'src/app/shared/services/admin-categories/admin-categories.service';
import { AdminProductService } from 'src/app/shared/services/admin-product/admin-product.service';
import { percentage } from "rxfire/storage";
import { Storage, ref, deleteObject, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  public formProducts!: FormGroup;
  public category!: ICategory[];
  public products!: IProduct[];
  public id = Math.round(Math.random() * 1000);
  public uploadPercent!: number;
  public currentId!: number;
  public editStatus = false;
  public deleteId!: number;

  constructor(
    private categoryService: AdminCategoriesService,
    private productsService: AdminProductService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadCategory();
    this.loadProducts();
    this.initProduct();

  }

  loadCategory() {
    this.categoryService.loadAll().subscribe(category => {
      this.category = category;
    })
  }

  loadProducts() {
    this.productsService.loadProduct().subscribe(products => {
      this.products = products;
    })
  }

  initProduct() {
    this.formProducts = this.fb.group({
      id: this.id,
      category: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }
  createProducts() {
    if (this.editStatus == true) {
      this.productsService.updateProduct(this.currentId, this.formProducts.value).subscribe(() => {
        this.loadProducts();
        this.initProduct();
        this.editStatus = false;
      })
    } else {
      this.productsService.addProduct(this.formProducts.value).subscribe(() => {
        this.loadProducts();
        this.initProduct()
      })
    }
  }

  editProduct(products: IProduct) {
    this.formProducts.patchValue({
      category: products.category,
      name: products.name,
      description: products.description,
      price: products.price,
      imagePath: products.imagePath,
    })
    this.currentId = products.id;
    this.editStatus = true;
  }
  deleteModal(produscts: IProduct) {
    this.deleteId = produscts.id;
  }
  deleteProduct() {
    this.productsService.deleteProduct(this.deleteId).subscribe(()=>{
      this.loadProducts();
    })
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.uploadFile('products', file.name, file)
      .then(data => {
        this.formProducts.patchValue({
          imagePath: data
        });
        // this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }


  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format')
    }
    return Promise.resolve(url);
  }
  valueByControl(control: string): string {
    return this.formProducts.get(control)?.value;
  }
}


