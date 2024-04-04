var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"home","component":"HomeComponent","canActivate":["AuthGuard"]},{"path":"login","component":"LoginComponent","canActivate":["LoginGuard"]},{"path":"survey-container","component":"ContainerComponent","canActivate":["AuthGuard"]},{"path":"admin","component":"AdminDashboardComponent","canActivate":["RolesGuard"],"data":{"role":"ADMINROLE"}},{"path":"survey-details/:userId","component":"ViewDetailsComponent","canActivate":["RolesGuard"],"data":{"role":"ADMINROLE"}},{"path":"","redirectTo":"/home","pathMatch":"full"},{"path":"**","redirectTo":"/home"}],"kind":"module"}]}
