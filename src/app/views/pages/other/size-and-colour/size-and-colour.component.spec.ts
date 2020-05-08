import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeAndColourComponent } from './size-and-colour.component';

describe('SizeAndColourComponent', () => {
  let component: SizeAndColourComponent;
  let fixture: ComponentFixture<SizeAndColourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeAndColourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeAndColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
