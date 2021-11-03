import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Placeholder, Template, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FormPageComponent } from './form-page.component';

const howToFindPageHeader = (element: DebugElement): boolean =>
  element.name === 'header'
  && !!element.classes['page'];

const howToFindPageFooter = (element: DebugElement): boolean =>
  element.name === 'footer'
  && !!element.classes['page'];

const howToFindForm = (element: DebugElement): boolean =>
  element.name === 'form'
  && !!element.classes['template'];

const howToFindArticle = (element: DebugElement): boolean =>
  element.name === 'article'
  && !!element.classes['template'];

const howToFindArticleHeader = (element: DebugElement): boolean =>
  element.name === 'header'
  && !!element.classes['article'];

const howToFindArticleFooter = (element: DebugElement): boolean =>
  element.name === 'footer'
  && !!element.classes['article'];

const howToFindInput = (element: DebugElement): boolean =>
  (element.name === 'input' || element.name === 'select' || element.name === 'textarea')
  && !!element.attributes['id']
  && !!element.attributes['name'];

const howToFindLabelFor = (input: DebugElement) =>
  (element: DebugElement): boolean =>
    element.name === 'label'
    && !!element.attributes['for']
    && element.attributes['for'] === input.attributes['id'];

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
      optional: true,
      break: true
    }, <Placeholder>{
      name: 'third-placeholder',
      dataType: 'number',
      break: true
    }, <Placeholder>{
      name: 'fourth-placeholder',
      dataType: 'select',
      options: ['Yes', 'No', 'Maybe'],
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

  describe('page header', () => {

    let header: DebugElement;

    beforeEach(() => {
      header = fixture.debugElement.query(howToFindPageHeader);
    });

    it('should exist', () => {
      expect(header).toBeTruthy();
    });

    it('should contain text', () => {
      expect(header.nativeElement.innerText).toBeTruthy();
    });

  });

  describe('page footer', () => {

    let footer: DebugElement;

    beforeEach(() => {
      footer = fixture.debugElement.query(howToFindPageFooter);
    });

    it('should exist', () => {
      expect(footer).toBeTruthy();
    });

    it('should contain text', () => {
      expect(footer.nativeElement.innerText).toBeTruthy();
    });

  });

  FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
    { paramMap: { } },
    { paramMap: { } },
    () => [fixture, activatedRoute, component.template$],
    undefined,
    () => {

      it('should not call template for on template service', () => {
        expect(templateService.templateFor).not.toHaveBeenCalled();
      });

    });

  FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
    { paramMap: { 'templateIdentifier': 'asdfasdf' } },
    { paramMap: { 'templateIdentifier': 1 } },
    () => [fixture, activatedRoute, component.template$],
    template,
    () => {

      it('should call template for on template service', () => {
        expect(templateService.templateFor).toHaveBeenCalled();
      });

    });

  const getResult = FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
    { paramMap: { 'templateIdentifier': 'asdfasdf' } },
    { paramMap: { 'templateIdentifier': 1 } },
    () => [fixture, activatedRoute, component.placeholders$],
    expectedPlaceholders,
    () => {

      it('should call extract placeholders from on template service', () => {
        expect(templateService.extractPlaceholdersFrom).toHaveBeenCalled();
      });

      describe('placeholders', () => {

        let receivedPlacholders: Array<Placeholder>;

        beforeEach(() => {
          receivedPlacholders = getResult();
        });

        it('should have the correct length', () => {
          expect(receivedPlacholders.length).toBe(expectedPlaceholders.length);
        });

        describe('form', () => {

          let form: DebugElement;

          beforeEach(() => {
            form = fixture.debugElement.query(howToFindForm);
          });

          it('should exist', () => {
            expect(form).toBeTruthy();
          });

          describe('article', () => {

            let article: DebugElement;

            beforeEach(() => {
              article = form.query(howToFindArticle);
            });

            it('should exist', () => {
              expect(article).toBeTruthy();
            });

            describe('header', () => {

              let header: DebugElement;

              beforeEach(() => {
                header = article.query(howToFindArticleHeader);
              });

              it('should exist', () => {
                expect(header).toBeTruthy();
              });

              it('should contain text', () => {
                expect(header.nativeElement.innerText).toBeTruthy();
              });

            });

            describe('footer', () => {

              let footer: DebugElement;

              beforeEach(() => {
                footer = article.query(howToFindArticleFooter);
              });

              it('should exist', () => {
                expect(footer).toBeTruthy();
              });

              it('should contain text', () => {
                expect(footer.nativeElement.innerText).toBeTruthy();
              });

            });

            describe('fields', () => {

              let labels: Array<DebugElement>;
              let inputs: Array<DebugElement>;

              beforeEach(() => {
                inputs = article.queryAll(howToFindInput);
                labels = inputs.reduce((result, input) => {
                  const label = form.query(howToFindLabelFor(input));
                  result.push(label);
                  return result;
                }, new Array<DebugElement>());
              });

              it('should have an input for each placeholder', () => {
                expect(inputs.length).toBe(expectedPlaceholders.length);
              });

              it('should have a label for each input', () => {
                expect(labels.length).toBe(expectedPlaceholders.length);
              });

              expectedPlaceholders.forEach((placeholder, index) => {

                describe(`label for ${placeholder.name}`, () => {

                  it(`should indicate ${placeholder.optional ? 'optional' : 'required'}`, () => {
                    const suffix = placeholder.optional ? '' : '*';
                    const expectedLabel = placeholder.name + suffix;
                    expect(labels[index].nativeElement.innerText).toBe(expectedLabel);
                  });

                });

                describe(`input for ${placeholder.name}`, () => {

                  it(`should be ${placeholder.optional ? 'optional' : 'required'}`, () => {
                    if (placeholder.optional) {
                      expect(inputs[index].attributes['required']).toBeUndefined();
                    } else {
                      expect(inputs[index].attributes['required']).toBe('');
                    }
                  });

                });

              });

            });

          });

        });

      });

    });

});
