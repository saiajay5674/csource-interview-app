import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Careerfair } from '../_models/Careerfair'

//import {AuthService} from './auth.service';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CareerfairService {

  private host:string;

  constructor(private http: HttpClient) {
    this.host = 'http://localhost:3000'

    if (environment.production) {
      this.host = '';
    }
  }

  getCareerfairs() : Observable<Careerfair[]> {
    return this.http.get<Careerfair[]>(`${this.host}/api/careerfair/`);
  }

  getCareerfair(id) : Observable<Careerfair> {
    return this.http.get<Careerfair>(`${this.host}/api/careerfair/${id}`);
  }

  addCareerfair(val): Observable<any> {
    let careerfair = {
      term: val.term,
      year: val.year
    }

    console.log(careerfair);

    return this.http.post<any>(`${this.host}/api/careerfair`, careerfair);
  }

  deleteCareerfair(careerfair: Careerfair): Observable<any> {

    return this.http.delete<any>(`${this.host}/api/careerfair/${careerfair._id}`);
  }

  addInterview(id, companyId, studentId, time) {

    let data = {
      company: companyId,
      student: studentId,
      time
    };

    return this.http.patch<any>(`${this.host}/api/careerfair/interview/${id}`, data);
  }

  removeInterview(data) {
    return this.http.patch<any>(`${this.host}/api/careerfair/interview/`, data);
  }

  updateCompanyList(id){
    return this.http.patch<any>(`${this.host}/api/careerfair/company/${id}`, id);
  }

  updateCurrent(id) {
    return this.http.patch<any>(`${this.host}/api/careerfair/current/${id}`, id);
  }

  getCurrent(): Observable<Careerfair> {
    return this.http.get<Careerfair>(`${this.host}/api/careerfair/current`);
  }

  getCurrentInterviews(id): Observable<Careerfair> {
    return this.http.get<Careerfair>(`${this.host}/api/careerfair/current/${id}`);
  }
}
