import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendersComponent } from './venders.component';

describe('VendersComponent', () => {
  let component: VendersComponent;
  let fixture: ComponentFixture<VendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
