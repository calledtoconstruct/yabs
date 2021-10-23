import { CdkTableModule } from '@angular/cdk/table';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeActivatedRoute } from '../../fake/activated-route.fake';
import { FakeArticleService } from '../../fake/article-service.fake';
import { FakeUserService } from '../../fake/user-service.fake';
import { UserService } from '../../user.service';
import { Article, ArticleService } from '../article.service';
import { DashboardComponent } from './dashboard.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FakeRouter } from '../../fake/router.fake';

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

const howToFindRequestPendingTab = (element: DebugElement): boolean =>
  element.name === 'div'
  && !!element.attributes['role']
  && element.attributes['role'] === 'tab'
  && element.children.length === 1
  && !!element.children[0].nativeElement.innerText
  && element.children[0].nativeElement.innerText === 'Request Pending';

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

type TabDefinition = { name: string, howToFind: (element: DebugElement) => boolean, label: string, index: number };
const tabs: Array<TabDefinition> = [
  { name: 'draft tab', howToFind: howToFindDraftTab, label: 'Draft', index: 0 },
  { name: 'request pending tab', howToFind: howToFindRequestPendingTab, label: 'Request Pending', index: 1 },
  { name: 'edit tab', howToFind: howToFindOutForEditTab, label: 'Out For Edit', index: 2 },
  { name: 'check tab', howToFind: howToFindOutForCheckTab, label: 'Out For Fact Check', index: 3 },
  { name: 'ready tab', howToFind: howToFindReadyTab, label: 'Ready', index: 4 },
  { name: 'published tab', howToFind: howToFindPublishedTab, label: 'Published', index: 5 }
];

describe('Write -> Dashboard', () => {

  let articleService: FakeArticleService;
  let activatedRoute: FakeActivatedRoute;
  let userService: FakeUserService;
  let router: FakeRouter;

  beforeEach(() => {
    articleService = new FakeArticleService();
    activatedRoute = new FakeActivatedRoute();
    userService = new FakeUserService();
    router = new FakeRouter(activatedRoute);
  });

  afterEach(() => {
    userService.tearDown();
    activatedRoute.tearDown();
    articleService.tearDown();
    router.tearDown();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CdkTableModule, MatTabsModule, NoopAnimationsModule],
      providers: [
        { provide: ArticleService, useValue: articleService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
  });

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let loader: HarnessLoader;

  beforeEach(() => {
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const verifyRoute = (tab: TabDefinition): void => {

    describe(`when route ${tab.label} is activated`, () => {

      beforeEach(() => {
        activatedRoute.nextQueryParamMap({ tab: tab.index });
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

        describe('tab group', () => {

          let tabGroups: Array<MatTabGroupHarness>;

          beforeEach(async () => {
            tabGroups = await loader.getAllHarnesses(MatTabGroupHarness);
          });

          it('should exist', () => {
            expect(tabGroups.length).toBe(1);
          });

          describe(`when ${tab.name} is selected`, () => {

            let tabGroup: MatTabGroupHarness;

            beforeEach(async () => {
              const tabGroups = await loader.getAllHarnesses(MatTabGroupHarness);
              tabGroup = tabGroups[0];
              await tabGroup.selectTab({
                label: tab.label
              });
            });

            it('should exist', () => {
              expect(tabGroup).toBeTruthy();
            });

            describe('article service collection', () => {

              it(`should be called for ${tab.label} status`, () => {
                expect(articleService.collectionCalledFor[tab.label]).toBe(1);
              });

              [{
                label: 'an article is',
                articles: new Array<Article>(
                  <Article>{ title: 'alsdjfa', text: 'uhfwiu' }
                )
              }, {
                label: 'three articles are',
                articles: new Array<Article>(
                  <Article>{ title: 'alsdjfa', text: 'uhfwiu' },
                  <Article>{ title: 'vuybybwas', text: 'wyebf' },
                  <Article>{ title: 'qvasduf', text: 'pvasdf' }
                )
              }].forEach(item => {

                describe(`when ${item.label} returned`, () => {

                  beforeEach(() => {
                    articleService.nextCollection(item.articles);
                    fixture.detectChanges();
                  });

                  describe('table', () => {

                    let table: DebugElement;
                    let thead: DebugElement;
                    let tbody: DebugElement;
                    let tfoot: DebugElement;

                    beforeEach(() => {
                      table = fixture.debugElement.query(howToFindTable);
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

                    it(`should have a row count of ${item.articles.length}`, () => {
                      expect(table.queryAll(howToFindTableBody).length).toBe(item.articles.length);
                    });

                  });

                });

              });

            });

          });

        });

      });

    });

  };

  tabs.forEach(tab => verifyRoute(tab));

  describe('when user is not logged in', () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
    });

    afterEach(() => {
      userService.tearDown();
    });

    describe('tab group', () => {

      tabs.forEach(item => {

        it(`should not include ${item.name}`, () => {
          const target = fixture.debugElement.query(item.howToFind);
          expect(target).toBeFalsy();
        });

      });

    });

  });

});
