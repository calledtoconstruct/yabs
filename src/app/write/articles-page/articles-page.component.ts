import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const articleIdentifierParameterName = 'articleIdentifier';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {

  public readonly showEditor$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.has(articleIdentifierParameterName))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
