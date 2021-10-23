import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly columns: { [key: string]: Array<string> } = {
    'Draft': new Array<string>('title')
  };

  public readonly tab$ = this.activatedRoute.queryParamMap.pipe(
    map(queryParamMap => queryParamMap.get('tab') || 'Draft')
  );

  public readonly columns$ = this.tab$.pipe(
    map(tab => this.columns[tab])
  );

  public readonly data$ = this.tab$.pipe(
    map(tab => this.articleService.collection(tab))
  );

  constructor(
    private readonly articleService: ArticleService,
    public readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
  }

}
