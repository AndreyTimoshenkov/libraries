import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mark'
})
export class MarkPipe implements PipeTransform {

  // transform(data: string, filterValue: string): string {
  //   return data.replace(filterValue, `<mark>${filterValue}</mark>`);
  // }
  transform(data: string, filterValue: string): string {
    if (!data || !filterValue) {
      return data;
    }

    const escapedFilterValue = filterValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedFilterValue, 'gi');
    return data.replace(regex, (match) => `<mark>${match}</mark>`);
  }
}
