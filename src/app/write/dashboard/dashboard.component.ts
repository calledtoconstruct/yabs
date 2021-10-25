import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { Article, WriteArticleService } from '../write-article.service';

type TabDefinition = [string, Array<string>];
type TabsDefinition = Array<TabDefinition>;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private readonly tabs: TabsDefinition = [
    ['Draft', new Array<string>('title')],
    ['Request Pending', new Array<string>('text')],
    ['Out For Edit', new Array<string>('title')],
    ['Out For Fact Check', new Array<string>('text')],
    ['Ready', new Array<string>('title')],
    ['Published', new Array<string>('text')]
  ];

  public readonly tabIndex$: Observable<number> = this.activatedRoute.queryParamMap.pipe(
    map((queryParamMap): string => queryParamMap.get('tab') || '0'),
    map(tabIndexString => parseInt(tabIndexString, 10)),
    map(tabIndex => isNaN(tabIndex) ? 0 : tabIndex),
    shareReplay(1)
  );

  public readonly tabDefinition$: Observable<TabDefinition> = this.tabIndex$.pipe(
    map(tabIndex => this.tabs[tabIndex]),
  );

  public readonly columns$: Observable<Array<string>> = this.tabDefinition$.pipe(
    map(tabDefinition => tabDefinition[1]),
    shareReplay(1)
  );

  public readonly data$: Observable<Array<Article>> = combineLatest([this.userService.loggedIn$, this.tabDefinition$]).pipe(
    filter(([loggedIn, _]) => loggedIn),
    map(([_, tabDefinition]) => tabDefinition[0]),
    distinctUntilChanged(),
    switchMap(tabName => this.articleService.collection(tabName)),
    shareReplay(1)
  );

  constructor(
    private readonly articleService: WriteArticleService,
    public readonly userService: UserService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly router: Router
  ) { }

}
