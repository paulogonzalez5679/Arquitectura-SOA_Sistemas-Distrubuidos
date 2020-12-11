import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortname'
})
export class SortnamePipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    value.sort((a,b)=>{
      let x = a.pro_precio;
      let y = b.pro_precio;

      if(x<y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
   
  }

}
