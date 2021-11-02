import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Placeholder, Template, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountContainer } from 'src/app/test/count-container.type';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FormPageComponent } from './form-page.component';

const howToFindForm = (element: DebugElement): boolean => 
  element.name === 'form'
  && element.classes['template'];

const howToFindInput = (element: DebugElement): boolean =>
  element.name === 'input';

describe('Document -> Form Page', () => {

  const firstPlaceholder = '${first-placeholder: string}';
  const secondPlaceholder = '${second-placeholder: number, break}';

  const template = <Template>{
    text: `${firstPlaceholder} and ${secondPlaceholder}`
  };

  const expectedPlaceholders = [
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
      'extractPlaceholdersFrom': expectedPlaceholders
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
      imports: [CommonModule],
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
    expectedPlaceholders,
    () => [fixture, component.placeholders$, activatedRoute],
    () => {

      it('should call extract placeholders from on template service', () => {
        expect(templateService.extractPlaceholdersFrom).toHaveBeenCalled();
      });

      describe('placeholders', () => {

        let result: Array<Placeholder>;
        let hasWasCalledFor: CountContainer;
        let getWasCalledFor: CountContainer;

        beforeEach(() => {
          [result, hasWasCalledFor, getWasCalledFor] = getResult();
        });

        it('should have the correct length', () => {
          expect(result.length).toBe(2);
        });

        describe('form', () => {
          
          let form: DebugElement;
          let inputs: Array<DebugElement>;

          beforeEach(() => {
            form = fixture.debugElement.query(howToFindForm);
            inputs = form.queryAll(howToFindInput);
          });

          it('should exist', () => {
            expect(form).toBeTruthy();
          });

          it('should have an input for each placeholder', () => {
            expect(inputs.length).toBe(expectedPlaceholders.length);
          });

        });
        
      });

    });

});
