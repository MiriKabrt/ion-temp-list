# ion3-list
Special template list for ionic3 project. 

## Github
https://github.com/MiriKabrt/ion-temp-list


## Install

```bash
npm install --save ion3-list
```

### Usage

Then include the `ion3-list` in your module.


```javascript
import { IonTempListModule } from 'ion3-list'

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonTempListModule,
    IonicPageModule.forChild(ListPage),
  ],
  exports: [
    ListPage
  ]
})
export class ListModule {}
```

This will create a list with infinitive scrolling (because of DOM), you can use orderBy and filter

```html
<ion-temp-list [items]="peopleList" orderBy="name" filter="John">
    <ng-template let-item="$implicit" let-i="index">
      <button ion-item no-padding (click)="onClick(item)">
          {{item.firstName}}
      </button>
    </ng-template>
  </ion-temp-list>
```
   