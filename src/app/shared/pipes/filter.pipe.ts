import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category/category.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(category:Array<ICategory>,value:string): ICategory[] {
    if(!value){
      return category;
    } else{
      return category.filter(elem =>{
        return elem.name.toLowerCase().includes(value.toLowerCase());
      })
    }
  }

}
