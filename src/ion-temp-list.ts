import { Component, ContentChild, TemplateRef, Input, OnChanges } from '@angular/core'
import { FilterByPipe } from 'ngx-pipes'


@Component({
  selector: 'ion-temp-list',
  template: `
  <ion-list *ngIf="items.length">
    <ng-content></ng-content>
    <ng-template ngFor let-item [ngForOf]="items | filterBy:filterKey:filter | orderBy:orderBy | slice:0:limit" [ngForTemplate]="template">
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
  filterKeys: Array<string> = []

  @Input()
  orderBy: string

  @Input()
  limit: number = 15

  constructor(
    public searchPipe: FilterByPipe
  ) {}

  ngOnChanges() {
    this.limit = 15
    if(this.filterKeys.length === 0 && this.items.length !== 0){
      this.fullFilterKey()
    }
  }

  doInfinite(infiniteScroll: any) {
    setTimeout(() => {
      this.limit = this.limit + 15
      infiniteScroll.complete()
    }, 500)
  }

  showInfinitScroll() {
    return this.searchPipe.transform(this.items, this.filterKeys, this.filter).length >= this.limit
  }

  fullFilterKey(){
    const self = this
    Object.keys(this.items[0]).forEach(key => {
      self.filterKeys.push(key)
    })
  }

}
