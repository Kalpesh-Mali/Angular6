import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashdailogComponent } from './trashdailog.component';

describe('TrashdailogComponent', () => {
  let component: TrashdailogComponent;
  let fixture: ComponentFixture<TrashdailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashdailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashdailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
