import { ActivatedRoute, Router } from '@angular/router';
import { Article, WriteArticleService } from '../write-article.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabGroupHarness, MatTabHarness } from '@angular/material/tabs/testing';
import { CdkTableModule } from '@angular/cdk/table';
import { DashboardComponent } from './dashboard.component';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from '../../fake/activated-route.fake';
import { FakeRouter } from '../../fake/router.fake';
import { FakeUserService } from '../../fake/user-service.fake';
import { FakeWriteArticleService } from '../fake/write-article-service.fake';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { User } from '@angular/fire/auth';
import { UserService } from '../../user.service';

const howToFindPageHeader = (element: DebugElement): boolean =>
  element.name === 'header'
  && !!element.classes['page'];

const howToFindNavigation = (element: DebugElement): boolean =>
  element.name === 'nav'
  && !!element.classes['page'];

const howToFindTabHeader = (element: DebugElement): boolean =>
  element.name === 'header'
  && !!element.classes['tab'];

const howToFindTabFooter = (element: DebugElement): boolean =>
  element.name === 'footer'
  && element.classes['tab'];

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

  let articleService: FakeWriteArticleService;
  let activatedRoute: FakeActivatedRoute;
  let userService: FakeUserService;
  let router: FakeRouter;

  beforeEach(() => {
    articleService = new FakeWriteArticleService();
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
        { provide: WriteArticleService, useValue: articleService },
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

    FakeActivatedRoute.whenRouteIsActivated(
      { queryParamMap: { tab: tab.index.toString() } },
      { queryParamMap: { tab: 1 } },
      () => [fixture, activatedRoute],
      () => {

        describe('header', () => {

          let header: DebugElement;

          beforeEach(() => {
            header = fixture.debugElement.query(howToFindPageHeader);
          });

          it('should exist', () => {
            expect(header).toBeTruthy();
          });

          it('should contain text', () => {
            expect(header.nativeElement.innerText).toBeTruthy();
          });

        });

        describe('navigation', () => {

          let navigation: DebugElement;

          beforeEach(() => {
            navigation = fixture.debugElement.query(howToFindNavigation);
          });

          it('should exist', () => {
            expect(navigation).toBeTruthy();
          });

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

            describe('selected tab', () => {

              let selectedTab: MatTabHarness;

              beforeEach(async () => {
                selectedTab = await tabGroup.getSelectedTab();
              });

              it('should exist', () => {
                expect(selectedTab).toBeTruthy();
              });

              it('should have the correct label', async () => {
                expect(await selectedTab.getLabel()).toBe(tab.label);
              });

            });

            describe('tab header', () => {

              let header: DebugElement;

              beforeEach(() => {
                header = fixture.debugElement.query(howToFindTabHeader);
              });

              it('should exist', () => {
                expect(header).toBeTruthy();
              });

              it('should contain text', () => {
                expect(header.nativeElement.innerText).toBeTruthy();
              });

            });

            describe('tab footer', () => {

              let footer: DebugElement;

              beforeEach(() => {
                footer = fixture.debugElement.query(howToFindTabFooter);
              });

              it('should exist', () => {
                expect(footer).toBeTruthy();
              });

              it('should contain text', () => {
                expect(footer.nativeElement.innerText).toBeTruthy();
              });

            });

            describe('article service collection', () => {

              describe('even when route is activated multiple times', () => {

                beforeEach(() => {
                  activatedRoute.nextQueryParamMap({ tab: tab.index });
                  fixture.detectChanges();
                });

                it(`should be called once for ${tab.label} status`, () => {
                  expect(articleService.collectionCalledFor[tab.label]).toBe(1);
                });

              });

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
                    articleService.nextArticlesFor(item.articles);
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

      }
    );

  };

  const displayName = 'abvsunvj';
  const user = <User>{
    displayName: displayName
  };

  FakeUserService.whenUserIsLoggedIn(() => [userService, fixture], user, () => {

    tabs.forEach(tab => verifyRoute(tab));

  });

  FakeUserService.whenUserIsNotLoggedIn(() => [userService, fixture], () => {

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
