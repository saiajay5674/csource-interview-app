import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_models/Company';

//import {AuthService} from './auth.service';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  private host:string;

  constructor(private http: HttpClient) {
    this.host = 'http://localhost:3000'

    if (environment.production) {
      this.host = '';
    }
  }

  getCompanies() : Observable<Company[]> {
    return this.http.get<Company[]>(`${this.host}/api/company/`);
  }

  addCompany(val): Observable<any> {
    let company = {
      name: val.name,
      domain: val.domain
    }

    console.log(company);

    return this.http.post<any>(`${this.host}/api/company`, company);
  }

  deleteCompany(company: Company): Observable<any> {

    return this.http.delete<any>(`${this.host}/api/company/${company._id}`);
  }

  //get Company by ID
  getCompany(id){
    return this.http.get(`${this.host}/api/company/${id}`);
  }

  getCompanyByUser(id): Observable<Company> {
    return this.http.get<Company>(`${this.host}/api/company/user/${id}`);
  }
}
