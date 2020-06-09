import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { OnlyAdminUsersGuard } from "./admin-user-guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [OnlyAdminUsersGuard],
    children: [
      {
        path: "",
        redirectTo: "/admin/dash",
        pathMatch: "full",
      },
      {
        path: "dash",
        component: AdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
