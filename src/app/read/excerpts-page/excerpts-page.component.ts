import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
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

  private readonly uid$ = this.userService.user$.pipe(
    map(user => user ? user.uid : '')
  );

  public readonly excerpts$ = combineLatest([this.uid$, this.category$]).pipe(
    distinctUntilChanged(),
    switchMap(([userIdentifier, category]: [string, string]) => this.articleService.excerptsFor(userIdentifier, category)),
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
