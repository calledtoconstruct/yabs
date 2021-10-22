import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';

const articleIdentifierParameterName = 'articleIdentifier';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {

  public readonly formGroup = this.formBuilder.group({
    title: this.formBuilder.control(''),
    text: this.formBuilder.control(''),
    operation: this.formBuilder.control('saveOnly')
  });

  public readonly showEditor$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.has(articleIdentifierParameterName))
  );

  constructor(
    public readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
