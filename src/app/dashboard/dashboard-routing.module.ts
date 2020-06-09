import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "/dashboard/landing",
        pathMatch: "full",
      },
      {
        path: "landing",
        component: DashboardComponent,
      },
    ],
  },
];

export const DashboardRoutingModule = RouterModule.forChild(routes);
