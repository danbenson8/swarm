import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { OnlyAdminUsersGuard } from "./admin/admin-user-guard";
import { AuthGuard } from "@app/shared/guards";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent, NavigationComponent],
  providers: [AuthGuard, OnlyAdminUsersGuard],
})
export class DashboardModule {}
