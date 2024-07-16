import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule to use forms
import { Observable } from 'rxjs'; // Import Observable for handling HTTP responses
import { Router } from '@angular/router';
// import{reques}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule,CommonModule], // Import FormsModule
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corrected from styleUrl to styleUrls
})



export class SignupComponent implements OnInit {
  message: string = '';
  private apiUrl = 'http://localhost:8082/signup';
  
  
  
  constructor(private http: HttpClient , private router: Router) { }
  
  ngOnInit(): void {}
  
  onSubmit(form: any): void {
    this.signup(form.value).subscribe(
      data => {
         
        if(data=='Successful'){
              const token = {
                value: 'signed-in',
                expiry: new Date().getTime()+ (24 * 60 * 60 * 1000)    // Expiry time in 24hr
            };

           localStorage.setItem('user', JSON.stringify(token));
           console.log( localStorage.getItem('user'));

          //  localStorage.removeItem('user');
       
          this.router.navigate(['/home']); 

        }else{
           if(data[1]!=null){
            this.message= data[0] +'\n' + data[1] + '.' ;
           }else{
            this.message= data[0] ;
           }
        }
        

      },
      error => {
        console.error('Error signing up:', error); // Log error response
        this.message = 'Signup failed';
      }
    );
  }

  signup(credentials: { name: string; email: string; password: string }): Observable<String> {
    console.log('Sending signup request with credentials:', credentials); // Log request data
    return this.http.post<any>(this.apiUrl, credentials ,{ withCredentials: true });
  }
}
