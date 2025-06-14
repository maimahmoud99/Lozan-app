import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { CardBarChartComponent } from './components/cards/card-bar-chart/card-bar-chart.component';
import { CardLineChartComponent } from './components/cards/card-line-chart/card-line-chart.component';
import { IndexDropdownComponent } from './components/dropdowns/index-dropdown/index-dropdown.component';
import { PagesDropdownComponent } from './components/dropdowns/pages-dropdown/pages-dropdown.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { NotificationDropdownComponent } from './components/dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterSmallComponent } from './components/footers/footer-small/footer-small.component';
import { CardPageVisitsComponent } from './components/cards/card-page-visits/card-page-visits.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { CardProfileComponent } from './components/cards/card-profile/card-profile.component';
import { CardSettingsComponent } from './components/cards/card-settings/card-settings.component';
import { CardSocialTrafficComponent } from './components/cards/card-social-traffic/card-social-traffic.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { MapExampleComponent } from './components/maps/map-example/map-example.component';
import { AuthNavbarComponent } from './components/navbars/auth-navbar/auth-navbar.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { IndexNavbarComponent } from './components/navbars/index-navbar/index-navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footers/footer/footer.component';
import { AuthModule } from '../Layout/auth/auth.module';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { StarRatingModule } from 'angular-star-rating';
import { LucideAngularModule, SaudiRiyal } from 'lucide-angular';


@NgModule({
  declarations: [
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    ReviewsComponent,

  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    RouterModule,
    AuthModule,
    StarRatingModule.forChild(),
    LucideAngularModule.pick({SaudiRiyal}),
    
    
  ],exports:[
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    ReviewsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class TemplateModule { }
