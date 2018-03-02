import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'app/shared/material/material.module';
import { FormatToJapaneseDatePipe, RoundOffDatePipe, ShortenTextPipe } from './pipes';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule],
  declarations: [FormatToJapaneseDatePipe, RoundOffDatePipe, ShortenTextPipe, ImageUploadComponent],
  exports: [
    FormsModule,
    MaterialModule,

    FormatToJapaneseDatePipe,
    RoundOffDatePipe,
    ShortenTextPipe,

    ImageUploadComponent,
  ],
})
export class SharedModule {}
