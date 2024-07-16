import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movielist',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit, AfterViewInit {
  movies: any[] = [];
  private apiUrl = 'http://localhost:8082/movies';
  private page = 1; 
  private isLoading = false;  
  favorites: string[] = [];
  favs : String= 'http://localhost:8082/favorites';
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.page = 1; 
    this.fetchMovies();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  fetchMovies(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}?page=${this.page}`).subscribe(
      (data) => {
        this.movies = [...this.movies, ...data];
        this.page++;
        this.isLoading = false;
        console.log(this.movies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.isLoading = false;
      }
    );

    if(localStorage.getItem("user")!= null ){
       this.http.get<any[]>(`${this.favs}`,{ withCredentials: true }).subscribe(
        (data) => {
          this.favorites = data;
        },
        (error) => {
          console.error('Error fetching movies:', error);
          this.isLoading = false;
        }
      );

    }
  }

  isFavorite(imdbID: string): boolean {
    return this.favorites.includes(imdbID);
  }

  setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.fetchMovies();
        }
      });
    }, options);

    observer.observe(this.scrollAnchor.nativeElement);
  }
}
