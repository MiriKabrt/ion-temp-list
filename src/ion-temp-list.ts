import { Component, ContentChild, TemplateRef, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { FilterByPipe } from 'ngx-pipes'


@Component({
  selector: 'ion-temp-list',
  template: `
  <ion-list *ngIf="items.length">
  <ng-content></ng-content>
  <ng-template ngFor let-item [ngForOf]="items | filterBy:filterKeys:filter | orderBy:orderBy | slice:0:limitCount" [ngForTemplate]="template">
  </ng-template>
</ion-list>
<div *ngIf="!items.length && !loaded" text-center>
  <br/>
  <img src="assets/img/loading.gif" />
</div>
<ion-card *ngIf="!items.length && loaded" >
  <ion-card-content text-center>
    {{ noDataText }}
  </ion-card-content>
</ion-card>
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
  loaded = false

  @Input()
  noDataText = "No data available"

  @Input()
  filter: string

  @Input()
  filterKeys: Array<string> = []

  @Input()
  orderBy: string

  @Input()
  limit: number = 15

  limitCount: number

  @Output()
  loadAjax: EventEmitter<any> = new EventEmitter<any>()

  infiniteScroll

  areAjaxDataAllLoaded = false

  constructor(
    public searchPipe: FilterByPipe
  ) {}

  ngOnInit(){
    this.limitCount = this.limit
  }

  ngOnChanges() {
    if (!this.isAjaxActive()){
      this.limitCount = this.limit
    }
    if(this.filterKeys.length === 0 && this.items.length !== 0){
      this.fullFilterKey()
    }
  }

  fullFilterKey(){
    const self = this
    Object.keys(this.items[0]).forEach(key => {
      self.filterKeys.push(key)
    })
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll
    if (this.isAjaxActive() && !this.areAjaxDataAllLoaded && this.limitCount >= this.items.length){
      this.loadAjax.emit()
    }else{
      setTimeout(() => {
        this.completeScroll()
      }, 300)
    }
  }

  afterAjax(items){
    if (items.length < this.limit){
      this.areAjaxDataAllLoaded = true
    }
    this.completeScroll()
  }

  completeScroll(){
    if(this.infiniteScroll){
      this.limitCount = this.limitCount + this.limit
      this.infiniteScroll.complete()
    }
  }

  showInfinitScroll() {
    if (this.isAjaxActive() && !this.areAjaxDataAllLoaded){
      return true
    }else{
      return this.searchPipe.transform(this.items, this.filterKeys, this.filter).length >= this.limitCount
    }
  }

  isAjaxActive(){
    return this.loadAjax.observers.length > 0
  }

}
