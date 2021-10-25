import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { ReadArticleService } from '../read-article.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent {

  public readonly category$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('category') || 'local'),
    shareReplay(1)
  );

  public readonly excerpts$ = combineLatest([this.userService.loggedIn$, this.category$]).pipe(
    filter(([loggedIn, _]) => loggedIn),
    map(([_, category]) => category),
    distinctUntilChanged(),
    switchMap(category => this.articleService.excerptsFor(category)),
    shareReplay(1)
  );

  constructor(
    public readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly articleService: ReadArticleService
  ) { }

}
