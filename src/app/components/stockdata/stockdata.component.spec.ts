import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockdataComponent } from './stockdata.component';

describe('StockdataComponent', () => {
  let component: StockdataComponent;
  let fixture: ComponentFixture<StockdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
