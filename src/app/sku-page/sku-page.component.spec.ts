import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuPagePage } from './sku-page.page';

describe('SkuPagePage', () => {
  let component: SkuPagePage;
  let fixture: ComponentFixture<SkuPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
