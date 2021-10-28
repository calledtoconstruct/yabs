import { Article, WriteArticleService } from '../write-article.service';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/user.service';

const articleIdentifierParameterName = 'articleIdentifier';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent {

  public readonly formGroup = this.formBuilder.group({
    title: this.formBuilder.control(''),
    text: this.formBuilder.control(''),
    operation: this.formBuilder.control('saveOnly')
  });

  private readonly parameter$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get(articleIdentifierParameterName)),
    filter(articleIdentifierString => !!articleIdentifierString),
    shareReplay(1)
  );

  private readonly isNew$ = this.parameter$.pipe(
    map(articleIdentifierString => articleIdentifierString === 'new')
  );

  private readonly articleIdentifier$ = this.parameter$.pipe(
    map(articleIdentifierString => parseInt(articleIdentifierString || '0', 10))
  );

  private readonly article$ = combineLatest([this.userService.loggedIn$, this.isNew$, this.articleIdentifier$]).pipe(
    filter(([loggedIn, _, __]) => loggedIn),
    map(([_, isNew, articleIdentifier]): [boolean, number] => [isNew, articleIdentifier]),
    filter(([isNew, _]) => !isNew),
    map(([_, articleIdentifier]) => articleIdentifier),
    distinctUntilChanged(),
    switchMap(articleIdentifier => this.articleService.article(articleIdentifier)),
    shareReplay(1)
  );

  constructor(
    public readonly userService: UserService,
    private readonly articleService: WriteArticleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.article$.forEach((article: Article): void => {
      const keys = Object.keys(article) as Array<keyof Article>;
      keys.forEach(attribute => this.update(attribute, article));
    });
  }

  private update(name: keyof Article, article: Article): void {
    if (this.formGroup.get(name)?.value !== article[name]) {
      const value = article[name];
      this.formGroup.get(name)?.setValue(value);
    }
  }

  public done(): void {
    this.articleService.saveArticle(this.formGroup.value);
  }

}
