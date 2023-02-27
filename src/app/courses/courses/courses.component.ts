import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns  = ['name','category'];

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    //this.courses = [];
    //this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError( error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );

  }

  ngOnInit(): void{

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
