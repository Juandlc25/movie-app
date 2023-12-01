import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  movies: Movie[] = [];
  durationInSeconds = 5;
  watchlist: string[] = [];
  noResult: boolean = false;
  timer: any = null;
  searchQuery: string = '';
  sortSelected: string = '';
  sortOptions: { name: string; value: string }[] = [
    { name: 'Sort by title', value: 'title' },
    { name: 'Sort by released date', value: 'released-date' },
  ];
  constructor(public service: MovieService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getMovies();
    this.getWatchlist();
  }

  getMovies(): void {
    this.movies = this.service.getAllMovies();
  }

  getWatchlist(): void {
    this.watchlist = this.service.getWatchlist();
  }

  searchMovie(searchStr: string): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      searchStr = searchStr.trim();
      if (searchStr === '') {
        this.getMovies();
        return;
      }
      const response = this.service.searchMovie(searchStr);
      this.noResult = false;
      if (response && response.length === 0) {
        this.movies = [];
        this.noResult = true;
        return;
      }
      this.movies = response;
    }, 250);
  }

  selectSort() {
    if (this.sortSelected === 'title') {
      this.movies.sort((a, b) => a.Title.localeCompare(b.Title));
      return;
    }
    this.movies.sort((a, b) => {
      const dateA = new Date(a['Released-date']);
      const dateB = new Date(b['Released-date']);
      return dateA.getTime() - dateB.getTime();
    });
  }

  addToWatchlist(movie: string) {
    this.service.addToWatchlist(movie);
    this.getWatchlist();
    this.openSnackBar('Added to the watchlist');
  }

  removeFromWatchlist(movie: string) {
    this.service.removeFromWatchlist(movie);
    this.getWatchlist();
    this.openSnackBar('Removed from the watchlist');
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(ConfirmationComponent, {
      duration: this.durationInSeconds * 1000,
      data: message,
    });
  }
}
