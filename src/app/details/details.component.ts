import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TrailerComponent } from '../trailer/trailer.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  movie?: Movie = {} as Movie;
  innerWidth: any;
  constructor(
    public service: MovieService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.movie = this.service.getMovieById(Number(id));
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    // const relativeWidth =
    //   this.innerWidth > 1500 ? (1500 * 80) / 100 : (this.innerWidth * 80) / 100;
    // const relativeHeight = (relativeWidth * 9) / 16;
    // dialogConfig.width = relativeWidth + 'px';
    // dialogConfig.height = relativeHeight + 'px';
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
    dialogConfig.data = {
      url: this.movie!['Trailer-Link'],
    };
    this.dialog.open(TrailerComponent, dialogConfig);
  }
}
