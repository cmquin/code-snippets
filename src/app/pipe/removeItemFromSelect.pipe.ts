import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeItemFromSelect'
})
export class RemoveItemFromSelectPipe implements PipeTransform {
  transform(
    value: any,
    removeItem: boolean,
    removeItemText: string): any {
      if (removeItem==false){
        return value;
      }
      const resultArray=[];
      for (const item of value){
        if (item.value !== removeItemText){
          resultArray.push(item);
        }
      }
      return resultArray;
  }
}
