import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import * as fromMaterial from '@angular/material';

@NgModule({
  exports: [
    // FlexLayoutModule,
    fromMaterial.MatButtonModule,
    fromMaterial.MatCardModule,
    fromMaterial.MatMenuModule,
    fromMaterial.MatToolbarModule,
    fromMaterial.MatIconModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatTabsModule,
    fromMaterial.MatExpansionModule
  ],
  imports: [
    // FlexLayoutModule,
    fromMaterial.MatButtonModule,
    fromMaterial.MatCardModule,
    fromMaterial.MatMenuModule,
    fromMaterial.MatToolbarModule,
    fromMaterial.MatIconModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatTabsModule,
    fromMaterial.MatExpansionModule
  ]
})
export class MaterialModule {}
