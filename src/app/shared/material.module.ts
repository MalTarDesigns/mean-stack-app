import { NgModule } from "@angular/core";
// import { FlexLayoutModule } from '@angular/flex-layout';
import * as fromMaterial from "@angular/material";

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
    fromMaterial.MatExpansionModule,
    fromMaterial.MatProgressSpinnerModule
    // TODO: Add spnniers on load with a intercepter and spinner service
    // Ref: https://stackoverflow.com/questions/50100380/how-to-show-spinner-for-every-http-requests-in-angular-5
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    // https://stackoverflow.com/questions/45323108/show-a-loading-gif-for-each-http-request-angular-4
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
    fromMaterial.MatExpansionModule,
    fromMaterial.MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
