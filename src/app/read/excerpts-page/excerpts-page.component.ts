import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { ReadArticleService } from '../read-article.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-excerpts-page',
  templateUrl: './excerpts-page.component.html',
  styleUrls: ['./excerpts-page.component.scss']
})
export class ExcerptsPageComponent {

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
    private readonly articleService: ReadArticleService,
    private readonly router: Router
  ) { }

  public open(articleIdentifier: string): void {
    this.router.navigate(['/read', 'articles', articleIdentifier]);
  }

}
