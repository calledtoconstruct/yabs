import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Placeholder, Template, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FormPageComponent } from './form-page.component';
import { CountContainer } from 'src/app/test/count-container.type';

describe('Document -> Form Page', () => {

  const firstPlaceholder = '${first-placeholder: string}';
  const secondPlaceholder = '${second-placeholder: number, break}';

  const template = <Template>{
    text: `${firstPlaceholder} and ${secondPlaceholder}`
  };

  const placeholders = [
    <Placeholder>{
      name: 'first-placeholder',
      dataType: 'string'
    }, <Placeholder>{
      name: 'second-placeholder',
      dataType: 'number',
      break: true
    }
  ];

  let activatedRoute: FakeActivatedRoute;
  let templateService: jasmine.SpyObj<{
    templateFor: (templateIdentifier: string) => Observable<Template>,
    extractPlaceholdersFrom: (text: string) => Observable<Array<Placeholder>>
  }>;

  beforeEach(() => {
    activatedRoute = new FakeActivatedRoute();
    templateService = jasmine.createSpyObj('TemplateService', {
      'templateFor': of(template),
      'extractPlaceholdersFrom': placeholders
    });
  });

  afterEach(() => {
    activatedRoute.tearDown();
  });

  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: TemplateService, useValue: templateService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  FakeActivatedRoute.whenRouteIsActivated(
    { 'templateIdentifier': 'asdfasdf' },
    { 'templateIdentifier': 1 },
    template,
    () => [fixture, component.template$, activatedRoute],
    () => {

      it('should call template for on template service', () => {
        expect(templateService.templateFor).toHaveBeenCalled();
      });

    });

  const getResult = FakeActivatedRoute.whenRouteIsActivated(
    { 'templateIdentifier': 'asdfasdf' },
    { 'templateIdentifier': 1 },
    placeholders,
    () => [fixture, component.placeholders$, activatedRoute],
    () => {

      it('should call extract placeholders from on template service', () => {
        expect(templateService.extractPlaceholdersFrom).toHaveBeenCalled();
      });

      describe('result', () => {

        let result: Array<Placeholder>;
        let hasWasCalledFor: CountContainer;
        let getWasCalledFor: CountContainer;

        beforeEach(() => {
          [result, hasWasCalledFor, getWasCalledFor] = getResult();
        });

        it('should have the correct count of placeholders', () => {
          expect(result.length).toBe(2);
        });
        
      });

    });

});
