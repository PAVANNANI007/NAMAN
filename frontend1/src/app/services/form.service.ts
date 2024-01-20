import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:3000'; // Update with your server URL

  constructor(private http: HttpClient) {}
  updateFormData(formDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forms`, formDetails);
  }
  getFormData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/forms`);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
  // logindetails(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/login`);
  // }
}
