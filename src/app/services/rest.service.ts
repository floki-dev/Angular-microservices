import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  // используется в каждом сервисе для получения названия таблиц
  abstract endpoint(): string;

  constructor(protected http: HttpClient) {
  }

  get url() {
    return `${environment.api}/${this.endpoint()}`
  }

  // if pagination is used currentPage, otherwise it is not used
  all(page?: number): Observable<any> {
    let url = this.url;

    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get(url);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`)
  }

  create(data: [] | {}): Observable<any> {
    return this.http.post(this.url, data)
  }

  update(id: number, data: [] | {}): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  }
}
