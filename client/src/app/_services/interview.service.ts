import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Interview } from '../_models/Interview';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InterviewService {

  private host:string;

  constructor(private http: HttpClient) {
    this.host = 'http://localhost:3000'

    if (environment.production) {
      this.host = '';
    }
  }

  updateComplete(id) {
    return this.http.patch<any>(`${this.host}/api/interview/complete/${id}`, id);
  }

}
