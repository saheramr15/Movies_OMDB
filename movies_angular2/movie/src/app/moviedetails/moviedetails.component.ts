import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})

export class MoviedetailsComponent implements OnInit {
  movieId: string | null = null;
  addbutt:string="Add To Favorites";
  rembutt:string="";
  addto_message :string ="";
  addedSuccess:string="";
  movie: any = {};
  private apiUrl = 'http://localhost:8082/movies';
  checkfav:String = 'http://localhost:8082/checkfav';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');

    if(localStorage.getItem("user") ){

      this.http.get<any>(`${this.checkfav}/${this.movieId}`, { withCredentials: true}).subscribe(
        (data) => {

          console.log(data)
          if(data==true){
            this.addbutt="";
            this.rembutt="Remove";
          }
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );

    }

    this.fetchMovieDetails();
  }

  fetchMovieDetails(): void {
    if (this.movieId) {
      this.http.get<any>(`${this.apiUrl}/${this.movieId}`,{ withCredentials: true}).subscribe(
        (data) => {
          
          this.movie=data;
          // this.movieId=data["imdbID"];

        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
    }
  }
  
  favouritesApiUrl="http://localhost:8082/addtofav";
  addToFavorites(): void {


    if(localStorage.getItem("user") !=null ){

      this.http.post<any>(this.favouritesApiUrl, this.movieId ,{ withCredentials: true, responseType:'text' as 'json' }).subscribe(
        (response) => {
          this.addbutt="";
          this.rembutt="Remove";
          this.addedSuccess="Added Successfully! ";
        },
        (error) => {
          console.error('Error adding movie to favourites:', error);
          this.addto_message="error happened";
        }
      );

    }else{
      this.addto_message="Please Sign In First!";
    }
  }


   removefav="http://localhost:8082/removefav";
   removeFavorites(): void {

    this.http.post<any>(this.removefav, this.movieId ,{ withCredentials: true, responseType:'text' as 'json' }).subscribe(
      (response) => {
        this.addbutt="Add to Favorites";
        this.rembutt="";
        this.addedSuccess="Removed Successfully! ";
      },
      (error) => {
        console.error('Error adding movie to favourites:', error);
        this.addto_message="error happened";
      }
    );

  }

}
