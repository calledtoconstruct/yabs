import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { flatMap, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { Article, ArticleService } from '../article.service';

type TabDefinition = [string, Array<string>];
type TabsDefinition = Array<TabDefinition>;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly tabs: TabsDefinition = [
    ['Draft', new Array<string>('title')],
    ['Request Pending', new Array<string>('text')],
    ['Out For Edit', new Array<string>('title')],
    ['Out For Fact Check', new Array<string>('text')],
    ['Ready', new Array<string>('title')],
    ['Published', new Array<string>('text')]
  ];

  public readonly tabIndex$: Observable<number> = this.activatedRoute.queryParamMap.pipe(
    map((queryParamMap): string => queryParamMap.has('tab') ? queryParamMap.get('tab') || '0' : '0'),
    map(tabIndexString => parseInt(tabIndexString, 10)),
    map(tabIndex => isNaN(tabIndex) ? 0 : tabIndex)
  );

  public readonly tabDefinition$: Observable<TabDefinition> = this.tabIndex$.pipe(
    map(tabIndex => this.tabs[tabIndex])
  );

  public readonly columns$: Observable<Array<string>> = this.tabDefinition$.pipe(
    map(tabDefinition => tabDefinition[1])
  );

  public readonly data$: Observable<Array<Article>> = combineLatest([this.userService.loggedIn$, this.tabDefinition$]).pipe(
    switchMap(([loggedIn, tabDefinition]) => loggedIn ? this.articleService.collection(tabDefinition[0]) : of([]))
  );

  constructor(
    private readonly articleService: ArticleService,
    public readonly userService: UserService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly router: Router
  ) { }

  public ngOnInit(): void {
  }

}
