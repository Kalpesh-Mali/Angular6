import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteLabelsComponent } from './add-note-labels.component';

describe('AddNoteLabelsComponent', () => {
  let component: AddNoteLabelsComponent;
  let fixture: ComponentFixture<AddNoteLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
