import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderPaymantComponent } from './vender-paymant.component';

describe('VenderPaymantComponent', () => {
  let component: VenderPaymantComponent;
  let fixture: ComponentFixture<VenderPaymantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderPaymantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderPaymantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
