import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
//import { AuthService } from '../Services/auth.service';

// 1.
@Injectable()

class PermissionsService {
  canActivate(): boolean {
    return false;
  }

}


export const gaurdGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('user')){
    return true;
  }
else

{
  alert("you must login first");
  const rout:Router =inject(Router);
  rout.navigate(['/login']);
  return false;

}
};
 