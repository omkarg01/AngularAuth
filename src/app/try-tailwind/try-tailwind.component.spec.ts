import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryTailwindComponent } from './try-tailwind.component';

describe('TryTailwindComponent', () => {
  let component: TryTailwindComponent;
  let fixture: ComponentFixture<TryTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryTailwindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TryTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
