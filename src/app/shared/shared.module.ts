import { NgModule } from '@angular/core';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NumberFormatPipe } from './pipes/number-format.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    NumberFormatPipe
  ],
  imports: [],
  exports: [
    CapitalizePipe,
    NumberFormatPipe
  ]
})
export class SharerdModule {}
