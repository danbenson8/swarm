import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NavigationComponent } from "./navigation/navigation.component";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent, NavigationComponent],
})
export class DashboardModule {}
