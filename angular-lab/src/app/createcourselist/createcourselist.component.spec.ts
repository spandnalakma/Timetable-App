import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecourselistComponent } from './createcourselist.component';

describe('CreatecourselistComponent', () => {
  let component: CreatecourselistComponent;
  let fixture: ComponentFixture<CreatecourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecourselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
