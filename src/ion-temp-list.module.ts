import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { Ng2SearchPipeModule, Ng2SearchPipe } from 'ng2-search-filter'
import { NgPipesModule } from 'ngx-pipes'
import { IonTempList } from './ion-temp-list'

@NgModule({
  declarations: [
    IonTempList,
  ],
  imports: [
    Ng2SearchPipeModule,
    NgPipesModule,
    IonicPageModule.forChild(IonTempList),
  ],
  exports: [
    IonTempList
  ],
  providers: [
    Ng2SearchPipe
  ]
})
export class IonTempListModule {}
