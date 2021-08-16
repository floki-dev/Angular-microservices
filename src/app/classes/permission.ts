import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Auth} from "./auth";

export class Permission implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('permission.ts')

    // @ts-ignore
    console.log(Object.values(route.data))
    return Auth.canAccess(Object.values(route.data)) || false;
  }
}
