import { CdkTableModule } from '@angular/cdk/table';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from 'src/app/activated-route.fake';
import { FakeArticleService } from 'src/app/article-service.fake';
import { FakeUserService } from 'src/app/user-service.fake';
import { UserService } from 'src/app/user.service';
import { Article, ArticleService } from '../article.service';
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

type TableContext = { container?: DebugElement, table?: DebugElement };

const verifyTable = (context: TableContext, then: (tableContext: TableContext) => void) => {

  let thead: DebugElement;
  let tbody: DebugElement;
  let tfoot: DebugElement;

  beforeEach(() => {
    expect(context.container).toBeTruthy();
    if (context.container) {
      context.table = context.container.query(howToFindTable);
      thead = context.table.query(howToFindTableHeader);
      tbody = context.table.query(howToFindTableBody);
      tfoot = context.table.query(howToFindTableFooter);
    }
  });

  it('should exist', () => {
    expect(context.table).toBeTruthy();
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

  then(context);

};

describe('Write -> Dashboard', () => {

  let articleService: FakeArticleService;
  let activatedRoute: FakeActivatedRoute;
  let userService: FakeUserService;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    articleService = new FakeArticleService();
    activatedRoute = new FakeActivatedRoute();
    userService = new FakeUserService();
  });

  afterEach(() => {
    userService.tearDown();
    activatedRoute.tearDown();
    articleService.tearDown();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CdkTableModule, MatTabsModule, BrowserAnimationsModule],
      providers: [
        { provide: ArticleService, useValue: articleService },
        { provide: ActivatedRoute, useValue: activatedRoute },
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

  describe('when route is activated', () => {

    beforeEach(() => {
      activatedRoute.nextQueryParamMap({ tab: 'Draft' });
      fixture.detectChanges();
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

          describe('when draft tab is selected', () => {

            let selected: DebugElement;

            beforeEach(() => {
              selected = element.query(howToFindDraftTab);
            });

            describe('article service collection', () => {

              it('should be called for Draft status', () => {
                expect(articleService.collectionCalledFor['Draft']).toBe(1);
              });

              [{
                label: 'an article is',
                articles: new Array<Article>(<Article>{
                  title: 'alsdjfa',
                  text: 'uhfwiu'
                })
              }, {
                label: 'three articles are',
                articles: new Array<Article>(<Article>{
                  title: 'alsdjfa',
                  text: 'uhfwiu'
                }, <Article>{
                  title: 'vuybybwas',
                  text: 'wyebf'
                }, <Article>{
                  title: 'qvasduf',
                  text: 'pvasdf'
                })
              }].forEach(item => {

                describe(`when ${item.label} returned`, () => {

                  beforeEach(() => {
                    articleService.nextCollection(item.articles);
                  });

                  describe('table', () => {

                    const context: TableContext = {};

                    beforeEach(() => {
                      context.container = element;
                    });

                    verifyTable(context, (tableContext: TableContext) => {

                      it(`should have a row count of ${item.articles.length}`, () => {
                        expect(tableContext.table?.queryAll(howToFindTableBody).length).toBe(item.articles.length);
                      });

                    });

                  });

                });

              });
            });

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

});
