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

  addCompany(val): Observable<any> {
    let company = {
      name: val.name,
      domain: val.domain
    }

    console.log(company);

    return this.http.post<any>('http://localhost:3000/api/company', company);
  }

  deleteCompany(company: Company): Observable<any> {

    return this.http.delete<any>(`http://localhost:3000/api/company/${company._id}`);
  }

  //get Company by ID
  getCompany(id){
    return this.http.get(`http://localhost:3000/api/company/${id}`);
  }
}
