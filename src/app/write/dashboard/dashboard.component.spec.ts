import { CdkTableModule } from '@angular/cdk/table';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { FakeUserService } from 'src/app/fake-user-service';
import { UserService } from 'src/app/user.service';
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

  let userService: FakeUserService;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    userService = new FakeUserService();
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CdkTableModule],
      providers: [
        { provide: UserService, useValue: userService }
      ]
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

    const displayName = 'abvsunvj';
    const user = <User>{
      displayName: displayName
    };

    beforeEach(() => {
      userService.setUpLoggedInAs(user);
      fixture.detectChanges();
    });

    afterEach(() => {
      userService.tearDown();
    });

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

  describe('when user is not logged in', () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
    });

    afterEach(() => {
      userService.tearDown();
    });

    describe('display', () => {

      let element: DebugElement;

      beforeEach(() => {
        element = fixture.debugElement;
      });

      it('should not include table', () => {
        const table = element.query(howToFindTable);
        expect(table).toBeFalsy();
      });

    });

  });

});
