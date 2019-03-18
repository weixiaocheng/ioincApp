import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablsPage } from './tabls.page';

describe('TablsPage', () => {
  let component: TablsPage;
  let fixture: ComponentFixture<TablsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
