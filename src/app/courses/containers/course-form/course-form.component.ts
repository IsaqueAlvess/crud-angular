import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
    //this.form
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name,[Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)]
            ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course))
    }); //Grupo de campos ==> formGroup
    console.log(this.form)
    console.log(this.form.value)

  }

  private retrieveLessons(course: Course){
    const lessons = [];

    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    }else{
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: ''}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (record) => {
        this.onSuccess();
      },
      error: () => {
        this.onError();
      },
    });
  }

  public onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }
  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field != null && field?.hasError('required')) {//? -> significa que já faz a verificação de nulo
      return 'Campo obrigatório';
    }else
    if(field != null && field?.hasError('minlength')) {//? -> significa que já faz a verificação de nulo
      const min = '3';
      return `Tamanho mínimo precisa ser de ${min} caracteres`;
    }else

    if(field != null && field?.hasError('maxlength')) {//? -> significa que já faz a verificação de nulo
      const max = '100'
      return `Tamanho máximo excedido de ${max} caracteres`;
    }
    return 'Campo Inválido!';
  }

}
