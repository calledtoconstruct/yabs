import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent {

  public readonly template$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('templateIdentifier') || ''),
    distinctUntilChanged(),
    switchMap(this.templateService.templateFor),
    shareReplay(1)
  );

  public readonly placeholders$ = this.template$.pipe(
    distinctUntilChanged(),
    map(template => template.text),
    map(this.templateService.extractPlaceholdersFrom),
    shareReplay(1)
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly templateService: TemplateService
  ) {
  }

}
