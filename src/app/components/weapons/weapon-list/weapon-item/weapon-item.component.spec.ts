import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponItemComponent } from './weapon-item.component';

describe('WeaponItemComponent', () => {
  let component: WeaponItemComponent;
  let fixture: ComponentFixture<WeaponItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
