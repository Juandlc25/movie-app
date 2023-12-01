import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  watchlist: string[] = [];
  movies: Movie[] = [];
  durationInSeconds = 5;
  constructor(public service: MovieService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getWatchlist();
    this.getMovies();
  }

  getMovies(): void {
    this.movies = this.service
      .getAllMovies()
      .filter((movie) => this.watchlist.includes(movie.Title));
  }

  getWatchlist(): void {
    this.watchlist = this.service.getWatchlist();
  }

  removeFromWatchlist(movie: string) {
    this.service.removeFromWatchlist(movie);
    this.getWatchlist();
    this.getMovies();
    this.openSnackBar('Removed from the watchlist');
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(ConfirmationComponent, {
      duration: this.durationInSeconds * 1000,
      data: message,
    });
  }
}
