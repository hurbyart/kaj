import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotemeComponent } from './noteme.component';

describe('NotemeComponent', () => {
  let component: NotemeComponent;
  let fixture: ComponentFixture<NotemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
