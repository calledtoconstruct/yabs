import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { Article, ArticleService } from '../article.service';

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

  private readonly isNew$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get(articleIdentifierParameterName)),
    filter(articleIdentifierString => !!articleIdentifierString),
    map(articleIdentifierString => articleIdentifierString === 'new')
  );

  private readonly articleIdentifier$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get(articleIdentifierParameterName)),
    filter(articleIdentifierString => !!articleIdentifierString),
    map(articleIdentifierString => parseInt(articleIdentifierString || '0', 10))
  );

  private readonly article$ = combineLatest([this.userService.loggedIn$, this.isNew$, this.articleIdentifier$]).pipe(
    filter(([loggedIn, _, __]) => loggedIn),
    map(([_, isNew, articleIdentifier]): [boolean, number] => [isNew, articleIdentifier]),
    filter(([isNew, _]) => !isNew),
    switchMap(([_, articleIdentifier]: [boolean, number]) => this.articleService.article(articleIdentifier))
  );

  constructor(
    public readonly userService: UserService,
    private readonly articleService: ArticleService,
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
