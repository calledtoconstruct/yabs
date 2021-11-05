import { Component, OnDestroy } from '@angular/core';
import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Placeholder, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';

export type Step = 'form' | 'review' | 'save';
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnDestroy {

  public readonly documentNameInputIdentifier = '*-document-name';

  public readonly step$ = new ReplaySubject<Step>(1);

  public readonly template$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('templateIdentifier') || ''),
    filter(templateIdentifier => templateIdentifier !== ''),
    distinctUntilChanged(),
    switchMap(templateIdentifier => this.templateService.templateFor(templateIdentifier)),
    shareReplay(1)
  );

  public readonly placeholders$ = this.template$.pipe(
    distinctUntilChanged(),
    map(template => template.text),
    map(text => this.templateService.extractPlaceholdersFrom(text)),
    shareReplay(1)
  );

  public readonly formGroup$: Observable<FormGroup> = this.placeholders$.pipe(
    map(placeholders => placeholders.reduce(this.buildControl.bind(this), {})),
    map(controlsConfiguration => {
      controlsConfiguration['*-document-name'] = this.formBuilder.control('', Validators.required);
      return controlsConfiguration;
    }),
    map(controlsConfiguration => this.formBuilder.group(controlsConfiguration)),
    shareReplay(1)
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly templateService: TemplateService,
    private readonly formBuilder: FormBuilder
  ) {
    this.step$.next('form');
  }

  public ngOnDestroy(): void {
    this.step$.complete();
  }

  private buildControl(configuration: { [key: string]: FormControl }, placeholder: Placeholder): { [key: string]: FormControl } {
    configuration[placeholder.name] = placeholder.optional
      ? this.formBuilder.control('')
      : this.formBuilder.control('', Validators.required);
    return configuration;
  }

  public hydrateTemplate(templateText: string, formGroup: FormGroup): void {
    const replacements = Object.keys(formGroup.controls)
      .reduce((result: { [key: string]: string }, key) => {
        if (!key.startsWith('*-')) {
          result[key] = formGroup.controls?.[key].value;
        }
        return result;
      }, {});
    const _document = this.templateService.hydrateTemplate(templateText, replacements);
    this.step$.next('review');
  }

}
