import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Careerfair } from '../_models/Careerfair'

//import {AuthService} from './auth.service';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class CareerfairService {

  constructor(private http: HttpClient) { }

  getCareerfairs() : Observable<Careerfair[]> {
    return this.http.get<Careerfair[]>('http://localhost:3000/api/careerfair/');
  }

  getCareerfair(id) : Observable<Careerfair> {
    return this.http.get<Careerfair>(`http://localhost:3000/api/careerfair/${id}`);
  }

  addCareerfair(val): Observable<any> {
    let careerfair = {
      term: val.term,
      year: val.year
    }

    console.log(careerfair);

    return this.http.post<any>(`http://localhost:3000/api/careerfair`, careerfair);
  }

  deleteCareerfair(careerfair: Careerfair): Observable<any> {

    return this.http.delete<any>(`http://localhost:3000/api/careerfair/${careerfair._id}`);
  }

  updateCompanyList(id){
    console.log("\n\n===> updateComapnyList called angular ", id, "==\n")
    return this.http.patch<any>(`http://localhost:3000/api/careerfair/company/${id}`, id);
  }
}
