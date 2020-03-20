import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models/Company'

//import {AuthService} from './auth.service';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanies() : Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:3000/api/company/');
  }

  addCompany(val): Observable<Company[]> {
    let company = {
      name: val.name,
      domain: val.domain
    }

    console.log(company);

    return this.http.post<Company[]>('http://localhost:3000/api/company', company);
  }

}
