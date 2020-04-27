import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Student } from '../_models/Student';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private host:string;

  constructor(private http: HttpClient) {
    this.host = 'http://localhost:3000'

    if (environment.production) {
      this.host = '';
    }
  }

  getStudent(idNumber: string): Observable<any>{
    return this.http.get<any>(`${this.host}/api/students/${idNumber}`);
  }

}
