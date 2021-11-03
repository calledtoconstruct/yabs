import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Placeholder, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent {

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

  private getValidator(placeholder: Placeholder): ValidatorFn | null {
    return placeholder.optional ? null : Validators.required;
  }

  private buildControl(configuration: { [key: string]: FormControl }, placeholder: Placeholder): { [key: string]: FormControl } {
    configuration[placeholder.name] = this.formBuilder.control({}, this.getValidator(placeholder));
    return configuration;
  }

  public readonly formGroup$ = this.placeholders$.pipe(
    map(placeholders => placeholders.reduce(this.buildControl.bind(this), {})),
    map(controlsConfiguration => this.formBuilder.group(controlsConfiguration))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly templateService: TemplateService,
    private readonly formBuilder: FormBuilder
  ) {
  }

}
