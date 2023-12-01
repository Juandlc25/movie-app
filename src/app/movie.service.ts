import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { fakeData } from './mock';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor() {}
  private localStorageKey = 'watchlist';

  getAllMovies(): Movie[] {
    const data = fakeData;
    return data;
  }

  getMovieById(id: number): Movie | undefined {
    const data = fakeData.find((item) => item.id === id);
    return data;
  }

  searchMovie(query: string): Movie[] {
    const data = fakeData;
    const responseFiltered = data.filter((res: Movie) =>
      res.Title.toLowerCase().includes(query.toLowerCase())
    );
    return responseFiltered;
  }

  getWatchlist(): string[] {
    const watchlistStr = localStorage.getItem(this.localStorageKey);
    return watchlistStr ? JSON.parse(watchlistStr) : [];
  }

  addToWatchlist(movie: string): void {
    let watchlist = this.getWatchlist();
    watchlist.push(movie);
    this.saveWatchlist(watchlist);
  }

  removeFromWatchlist(movie: string): void {
    let watchlist = this.getWatchlist();
    watchlist = watchlist.filter((m) => m !== movie);
    this.saveWatchlist(watchlist);
  }

  private saveWatchlist(watchlist: string[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(watchlist));
  }
}
