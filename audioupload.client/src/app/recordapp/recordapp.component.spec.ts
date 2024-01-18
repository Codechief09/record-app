import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordappComponent } from './recordapp.component';
import { FormsModule } from '@angular/forms';

describe('RecordappComponent', () => {
  let component: RecordappComponent;
  let fixture: ComponentFixture<RecordappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordappComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
