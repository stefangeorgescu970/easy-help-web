import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class EnumsService {
  
    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');
  
    getEnums(): Observable<any> {  
      return this.http
        .get(environment.apiUrl + '/enums',{headers: this.myheader})
        .pipe(map((res: any) => {
          return res;
        }));
    }
  }
