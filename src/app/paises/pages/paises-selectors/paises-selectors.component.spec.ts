import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesSelectorsComponent } from './paises-selectors.component';

describe('PaisesSelectorsComponent', () => {
  let component: PaisesSelectorsComponent;
  let fixture: ComponentFixture<PaisesSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaisesSelectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisesSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
