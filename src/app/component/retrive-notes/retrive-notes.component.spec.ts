import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetriveNotesComponent } from './retrive-notes.component';

describe('RetriveNotesComponent', () => {
  let component: RetriveNotesComponent;
  let fixture: ComponentFixture<RetriveNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetriveNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetriveNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
