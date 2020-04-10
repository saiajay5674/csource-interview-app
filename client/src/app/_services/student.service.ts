import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudent(idNumber: string): Observable<any>{

    return this.http.get<any>(`http://localhost:3000/api/students/${idNumber}`);
  } 

}