import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "@app/shared/guards";
import { AccountManagerComponent } from "./manage/account-manager/account-manager.component";
import { SessionManagerComponent } from "./manage/session-manager/session-manager.component";
import { GroupManagerComponent } from "./manage/group-manager/group-manager.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: "manage",
        // canActivateChild: [AuthGuard],
        children: [
          { path: "account", component: AccountManagerComponent },
          { path: "groups", component: GroupManagerComponent },
          { path: "session/all", component: SessionManagerComponent },
        ],
      },
    ],
  },
];

export const DashboardRoutingModule = RouterModule.forChild(routes);
