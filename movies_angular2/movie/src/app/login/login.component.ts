import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm for form handling
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router'; // Import Router to navigate after login
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, CommonModule], // Import FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected from styleUrl to styleUrls
})
export class LoginComponent implements OnInit {

  error: string = '';
  private apiUrl = 'http://localhost:8082/login'; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.login(form.value).subscribe(
        data => {
          console.log('Response from server:', data); 

          if (data === 'Successful') {

            const token = {
              value: 'signed-in',
              expiry: new Date().getTime()+ (24 * 60 * 60 * 1000)    // Expiry time in 24hr
          };

            localStorage.setItem('user', JSON.stringify(token));
            this.router.navigate(['/']); 
          } else {

           this.error = '*' + data;
           console.log(data);

          }
        },
        error => {
          console.error('Error logging in:', error); // Log error response
          this.error = 'Login failed';
        }
      );
    }
  }

  login(credentials: { email: string; password: string }): Observable<String> {
    console.log('Sending login request with credentials:', credentials ); // Log request data
    return this.http.post<String>(this.apiUrl, credentials,{ withCredentials: true , responseType:'text' as 'json'} );
  }
}
