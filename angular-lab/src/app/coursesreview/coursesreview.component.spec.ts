import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesreviewComponent } from './coursesreview.component';

describe('CoursesreviewComponent', () => {
  let component: CoursesreviewComponent;
  let fixture: ComponentFixture<CoursesreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
