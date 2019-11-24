import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        let x=[]
        for (let index = 0; index < items.length; index++) {
            if(items[index].domicilio.zona!=undefined){
                x.push(items[index]);
            }
        }

        if (!items || !filter) {
            return items;
        }
        console.log(x)
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return x.filter(item =>  item.domicilio.zona.indexOf(filter) !== -1);
    }
}