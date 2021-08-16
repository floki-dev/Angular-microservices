import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

// @ts-ignore
export class ImageService {

  constructor(private http: HttpClient) { }

// @ts-ignore
  upload(formData) {
    console.log(formData)
    // @ts-ignore
    return this.http.post(`${environment.api}/upload`, formData)
  }
}
