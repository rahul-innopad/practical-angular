import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items)
      return [];
    if(!searchText)
      return items;
    searchText=searchText.toLowerCase();

    return items.filter((item)=>{
      return item.countryName.toLowerCase().includes(searchText);
    })
  }

}
