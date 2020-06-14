import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { OnlyAdminUsersGuard } from "./admin/admin-user-guard";
import { AuthGuard } from "@app/shared/guards";
import { GroupManagerComponent } from "./manage/group-manager/group-manager.component";
import { AccountManagerComponent } from "./manage/account-manager/account-manager.component";
import { SessionManagerComponent } from "./manage/session-manager/session-manager.component";
import { UserAdministrationComponent } from "./admin/user-administration/user-administration.component";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    GroupManagerComponent,
    AccountManagerComponent,
    SessionManagerComponent,
    UserAdministrationComponent,
  ],
  providers: [AuthGuard, OnlyAdminUsersGuard],
})
export class DashboardModule {}
