import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from 'ionic-angular'
import { NgArrayPipesModule, FilterByPipe } from 'ngx-pipes'
import { IonTempList } from './ion-temp-list'

@NgModule({
  declarations: [
    IonTempList
  ],
  imports: [
    NgArrayPipesModule,
    CommonModule,
    IonicModule
  ],
  exports: [
    IonTempList
  ],
  providers: [
    FilterByPipe
  ]
})
export class IonTempListModule {}
