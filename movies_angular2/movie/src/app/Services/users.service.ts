import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http'; // Only import HttpClient here
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8081/signup'; // Adjust the endpoint if necessary

  constructor(private http: HttpClient) { }

  signup(credentials: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }


}
