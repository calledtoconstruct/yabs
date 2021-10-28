import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { ReadArticleService } from '../read-article.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent {

  public readonly articleIdentifier$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('articleIdentifier') || ''),
    filter(articleIdentifier => !!articleIdentifier),
    shareReplay(1)
  );

  public readonly article$ = combineLatest([this.userService.loggedIn$, this.articleIdentifier$]).pipe(
    filter(([loggedIn, _]) => loggedIn),
    map(([_, articleIdentifier]) => articleIdentifier),
    distinctUntilChanged(),
    switchMap(articleIdentifier => this.articleService.articleFor(articleIdentifier)),
    shareReplay(1)
  );

  constructor(
    public readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly articleService: ReadArticleService
  ) { }

}
