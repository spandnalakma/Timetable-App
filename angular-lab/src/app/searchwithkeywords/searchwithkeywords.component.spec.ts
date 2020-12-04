import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchwithkeywordsComponent } from './searchwithkeywords.component';

describe('SearchwithkeywordsComponent', () => {
  let component: SearchwithkeywordsComponent;
  let fixture: ComponentFixture<SearchwithkeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchwithkeywordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchwithkeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
