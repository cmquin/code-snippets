import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router){}
    
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem("token")  && localStorage.getItem("token").length > 0){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
