import { Component, ContentChild, TemplateRef, Input, OnChanges } from '@angular/core';
import { Ng2SearchPipe } from 'ng2-search-filter';

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ion-temp-list',
  template: `
  <ion-list *ngIf="items.length">
    <ng-content></ng-content>
    <ng-template ngFor let-item [ngForOf]="items | filter:filter | orderBy:orderBy | slice:0:limit" [ngForTemplate]="template">
    </ng-template>
  </ion-list>

  <ion-infinite-scroll *ngIf="showInfinitScroll()" (ionInfinite)="doInfinite($event)">
    <ion-infinite-scroll-content></ion-infinite-scroll-content>
  </ion-infinite-scroll>
  `
})
export class IonTempList implements OnChanges {

  @ContentChild(TemplateRef)
  template: TemplateRef<any>;

  @Input()
  items = []

  @Input()
  filter: string

  @Input()
  orderBy: string

  @Input()
  limit: number = 15

  constructor(public searchPipe: Ng2SearchPipe) {
  }

  ngOnChanges() {
    this.limit = 15
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.limit = this.limit + 15
      infiniteScroll.complete()
    }, 500)
  }

  showInfinitScroll() {
    return this.searchPipe.transform(this.items, this.filter).length >= this.limit
  }

}
