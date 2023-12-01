import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() Title: string = '';
  @Input() id: number = 0;
  @Input() Description: string = '';
  @Input() Rating: number = 0;
  @Input() Duration: string = '';
  @Input() Genre: string = '';
  @Input() poster_path: string = '';
  @Input() releasedDate: string = '';
  @Input() trailerLink: string = '';
  @Output() removeWatched = new EventEmitter();
  @Output() watchedClick = new EventEmitter();

  isInWatchList: boolean = false;
  watchlist: string[] = [];
  movie: Movie = {} as Movie;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movie = {
      id: this.id,
      Title: this.Title,
      Description: this.Description,
      Rating: this.Rating,
      Duration: this.Duration,
      Genre: this.Genre,
      poster_path: this.poster_path,
      'Released-date': this.releasedDate,
      'Trailer-Link': this.trailerLink,
    };
    this.watchlist = this.movieService.getWatchlist();
    this.isInWatchList = this.watchlist.some((movie) => movie === this.Title);
  }

  onClick() {
    if (this.isInWatchList) {
      this.removeFromWatchlist();
      return;
    }
    this.addToWatchlist();
  }

  addToWatchlist() {
    this.watchedClick.emit();
    this.isInWatchList = true;
  }

  removeFromWatchlist() {
    this.removeWatched.emit();
    this.isInWatchList = false;
  }
}
