import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

@NgModule({
  imports: [CommonModule, MaterialModule, DynamicFormModule],
  exports: [CommonModule, MaterialModule, DynamicFormModule],
  declarations: []
})
export class SharedModule {}
