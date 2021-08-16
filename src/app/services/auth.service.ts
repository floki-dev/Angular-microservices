import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /** Auth */

  login(data: User): Observable<any> {
    return this.http.post(`${environment.api}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.api}/logout`, {});
  }

  register(data: User): Observable<any> {
    return this.http.post(`${environment.api}/register`, data);
  }

  /** User */

  user(): Observable<any> {
    return this.http.get(`${environment.api}/user`);
  }

  updateInfo(data: User): Observable<any> {
    return this.http.put(`${environment.api}/users/info`, data);
  }

  updatePassword(data: User): Observable<any> {
    return this.http.put(`${environment.api}/users/password`, data);
  }
}
