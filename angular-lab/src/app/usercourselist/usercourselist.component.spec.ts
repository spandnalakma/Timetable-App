import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercourselistComponent } from './usercourselist.component';

describe('UsercourselistComponent', () => {
  let component: UsercourselistComponent;
  let fixture: ComponentFixture<UsercourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercourselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
