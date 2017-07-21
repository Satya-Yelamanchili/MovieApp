import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviespopularComponent } from './moviespopular.component';

describe('MoviespopularComponent', () => {
  let component: MoviespopularComponent;
  let fixture: ComponentFixture<MoviespopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviespopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviespopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
