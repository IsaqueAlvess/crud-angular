import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';

  constructor (
    public router: Router,
    public route: ActivatedRoute
  ){

  }

  public backHomePage() {
    this.router.navigate([''], {relativeTo: this.route});
  }

}
