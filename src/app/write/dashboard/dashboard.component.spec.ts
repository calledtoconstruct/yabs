import { CdkTableModule } from '@angular/cdk/table';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

const howToFindDraftTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Draft';

const howToFindRequestTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Request';

const howToFindOutForEditTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Out For Edit';

const howToFindOutForCheckTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Out For Check';

const howToFindReadyTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Ready';

const howToFindPublishedTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Published';

const tabs = [
  { name: 'draft tab', howToFind: howToFindDraftTab },
  { name: 'request tab', howToFind: howToFindRequestTab },
  { name: 'edit tab', howToFind: howToFindOutForEditTab },
  { name: 'check tab', howToFind: howToFindOutForCheckTab },
  { name: 'ready tab', howToFind: howToFindReadyTab },
  { name: 'published tab', howToFind: howToFindPublishedTab }
];

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
      imports: [CdkTableModule, MatTabsModule, BrowserAnimationsModule],
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

      describe('tab group', () => {

        tabs.forEach(item => {

          it(`should include ${item.name}`, () => {
            const target = element.query(item.howToFind);
            expect(target).toBeTruthy();
          });

        });

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

      describe('tab group', () => {

        tabs.forEach(item => {
  
          it(`should not include ${item.name}`, () => {
            const target = element.query(item.howToFind);
            expect(target).toBeFalsy();
          });
  
        });

      });

    });

  });

});
