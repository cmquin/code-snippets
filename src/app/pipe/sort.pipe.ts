import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sortBy'})
export class SortByPipe implements PipeTransform{
  transform(sortable: Array<any>, args: {property: string, direction: number}): any{
    if (sortable){
      if (args.property.length > 0){
        return sortable.sort((a:any, b:any) =>{
          if(a[args.property] < b[args.property]){
            return -1 * args.direction;
          }else if (a[args.property] > b[args.property]){
            return 1 * args.direction;
          }else{
            return 0;
          }
        });
      }else{
        return sortable.sort((a:any, b:any) =>{
          if(a < b){
            return -1 * args.direction;
          }else if (a > b){
            return 1 * args.direction;
          }else{
            return 0;
          }
        });
      }

    }

  }
}
