import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Interview } from '../_models/Interview';

@Injectable({ providedIn: 'root' })
export class InterviewService {

  constructor(private http: HttpClient) { }

  updateComplete(id) {
    return this.http.patch<any>(`http://localhost:3000/api/interview/complete/${id}`, id);
  }

}
