import { CdkTableModule } from '@angular/cdk/table';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

const howToFindTable = (element: DebugElement): boolean =>
  element.name === 'table'
  && Object.keys(element.attributes).includes('cdk-table')
  && Object.keys(element.attributes).includes('ng-reflect-data-source')
  && !!element.attributes['role']
  && element.attributes['role'] === 'table';

const howToFindTableHeader = (element: DebugElement): boolean =>
  element.name === 'tr'
  && Object.keys(element.attributes).includes('cdk-header-row')
  && !!element.attributes['role']
  && element.attributes['role'] === 'row';

const howToFindTableBody = (element: DebugElement): boolean =>
  element.name === 'tr'
  && Object.keys(element.attributes).includes('cdk-row')
  && !!element.attributes['role']
  && element.attributes['role'] === 'row';

const howToFindTableFooter = (element: DebugElement): boolean =>
  element.name === 'tr'
  && Object.keys(element.attributes).includes('cdk-footer-row')
  && !!element.attributes['role']
  && element.attributes['role'] === 'row';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CdkTableModule]
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

  describe('when user is logged in', () => {

    describe('display', () => {

      let element: DebugElement;

      beforeEach(() => {
        element = fixture.debugElement;
      });

      describe('table', () => {

        let table: DebugElement;
        let thead: DebugElement;
        let tbody: DebugElement;
        let tfoot: DebugElement;

        beforeEach(() => {
          table = element.query(howToFindTable);
          thead = table.query(howToFindTableHeader);
          tbody = table.query(howToFindTableBody);
          tfoot = table.query(howToFindTableFooter);
        });

        it('should exist', () => {
          expect(table).toBeTruthy();
        });

        it('should include a header', () => {
          expect(thead).toBeTruthy();
        });

        it('should include a body', () => {
          expect(tbody).toBeTruthy();
        });

        it('should include a footer', () => {
          expect(tfoot).toBeTruthy();
        });

      });

    });

  });

});
