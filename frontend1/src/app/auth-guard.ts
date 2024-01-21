import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { FormService } from 'src/app/services/form.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
        private formStateService: FormService,
		private router: Router) { }
        canActivate(
            next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
          ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            if (this.formStateService.isLoggedIn()) {
              return true;
            }
        
            // Navigate to the login page
            this.router.navigate(['/login']);
            return false;
          }
}
