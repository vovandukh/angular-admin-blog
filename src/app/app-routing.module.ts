import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent,children:[
    {path:'blog', component:AdminBlogComponent}
  ] },
  { path: 'blog', component: BlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
