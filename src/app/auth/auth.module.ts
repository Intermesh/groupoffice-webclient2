import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthComponent } from './auth.component';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
		canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    AuthComponent
  ],

  providers: [
		NoAuthGuard
	]
})
export class AuthModule {}
