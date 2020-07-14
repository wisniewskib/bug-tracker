import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { MainComponent } from "./main/main.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "tickets", loadChildren: () => import("./tickets/tickets.module").then((m) => m.TicketsModule) },
      { path: "projects", loadChildren: () => import("./projects/projects.module").then((m) => m.ProjectsModule) },
      { path: "teams", loadChildren: () => import("./teams/teams.module").then((m) => m.TeamsModule) },
      { path: "dashboard", component: DashboardComponent },
    ],
    // to na dole se skomentowalem dla testowania zeby bylo latwej
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
