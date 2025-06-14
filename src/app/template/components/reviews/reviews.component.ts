import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarRatingConfigService } from 'angular-star-rating';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  defaultEmpty = 'fa-align-center';
  defaultHalf = 'fa-align-justify';
  defaultFilled = 'fa-align-left';
  @Input() ratingobj: any ;

  get stars() {
    return Array(Math.floor(this.ratingobj.rating)).fill(0);
  }
  get hasHalfStar(): boolean {
    return this.ratingobj.rating % 1 !== 0;
  }
  form: FormGroup;
  constructor(fb: FormBuilder, sRCS: StarRatingConfigService) {
    this.form = fb.group({
      rating: [3.5],
      empty: [],
      half: [],
      filled: [],
    });

    this.form.valueChanges.subscribe((formValue) => {
      sRCS.classEmpty = formValue.half || this.defaultEmpty;
      sRCS.classHalf = formValue.half || this.defaultHalf;
      sRCS.classFilled = formValue.half || this.defaultFilled;
    });
  }

}
