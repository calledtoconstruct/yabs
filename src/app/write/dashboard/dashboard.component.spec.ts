import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

const howToFindTable = (element: DebugElement) => 
  element.name === 'table';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('display', () => {

    let element: DebugElement;

    beforeEach(() => {
      element = fixture.debugElement;
    });

    it('should contain a table', () => {
      const table = element.query(howToFindTable);
      expect(table).toBeTruthy();
    });

  });

});
