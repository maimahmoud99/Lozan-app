// loader.component.ts
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/Core/Services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-backdrop" *ngIf="loaderService.loading$ | async">
      <div class="loader-spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
