import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subscription } from 'rxjs';
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

const howToFindEditSection = (element: DebugElement): boolean =>
  element.name === 'section'
  && !!element.classes['edit'];

const howToFindActionSection = (element: DebugElement): boolean =>
  element.name === 'section'
  && !!element.classes['action'];

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

  const template = <Template>{
    text: 'ahghnbaisubbaiuybuasdfb'
  };

  interface TestPlaceholder extends Placeholder {
    emptyValue: string;
    validValue: string;
  }

  const expectedPlaceholders = [
    <TestPlaceholder>{
      name: 'first_placeholder',
      dataType: 'string',
      emptyValue: '',
      validValue: 'guwhyqwhuerhf'
    }, <TestPlaceholder>{
      name: 'secondplaceholder',
      dataType: 'number',
      optional: true,
      break: true,
      emptyValue: '',
      validValue: 'biuoaherifg'
    }, <TestPlaceholder>{
      name: 'third-placeholder',
      dataType: 'number',
      break: true,
      emptyValue: '',
      validValue: '2345234'
    }, <TestPlaceholder>{
      name: 'fourthplaceholder',
      dataType: 'select',
      options: ['', 'Yes', 'No', 'Maybe'],
      break: true,
      emptyValue: '',
      validValue: 'No'
    }
  ];

  const setValue = (placeholder: Placeholder, input: DebugElement, value: string) => {
    if (placeholder.dataType === 'select') {
      input.nativeElement.selectedIndex = placeholder.options
        .reduce((selectedIndex, option, index) => option === value ? index : selectedIndex, 0);
      input.nativeElement.dispatchEvent(new Event('change'));
    } else {
      input.nativeElement.value = value;
      input.nativeElement.dispatchEvent(new Event('input'));
    }
  };

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
      imports: [CommonModule, ReactiveFormsModule],
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
    { paramMap: {} },
    { paramMap: {} },
    () => [fixture, activatedRoute, component.template$],
    undefined,
    () => {

      it('should not call template for on template service', () => {
        expect(templateService.templateFor).not.toHaveBeenCalled();
      });

    });

  const templateIdentifier = 'asdfasdf';

  FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
    { paramMap: { 'templateIdentifier': templateIdentifier } },
    { paramMap: { 'templateIdentifier': 1 } },
    () => [fixture, activatedRoute, component.template$],
    template,
    () => {

      it('should call template for on template service', () => {
        expect(templateService.templateFor).toHaveBeenCalledWith(templateIdentifier);
      });

    });

  const getResult = FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
    { paramMap: { 'templateIdentifier': templateIdentifier } },
    { paramMap: { 'templateIdentifier': 1 } },
    () => [fixture, activatedRoute, component.placeholders$],
    expectedPlaceholders,
    () => {

      it('should call extract placeholders from on template service', () => {
        expect(templateService.extractPlaceholdersFrom).toHaveBeenCalledWith(template.text);
      });

      describe('placeholders', () => {

        let receivedPlacholders: Array<Placeholder>;

        beforeEach(() => {
          receivedPlacholders = getResult();
        });

        it('should have the correct length', () => {
          expect(receivedPlacholders.length).toBe(expectedPlaceholders.length);
        });

        describe('form and form group', () => {

          let form: DebugElement;
          let formGroup: FormGroup;
          let subscription: Subscription;

          beforeEach(() => {
            form = fixture.debugElement.query(howToFindForm);
            subscription = component.formGroup$.subscribe(fg => formGroup = fg);
          });

          afterEach(() => {
            subscription.unsubscribe();
          });

          it('should be emitted', () => {
            expect(formGroup).toBeTruthy();
          });

          expectedPlaceholders.forEach(placeholder => {

            let formControl: AbstractControl;

            beforeEach(() => {
              formControl = formGroup.controls[placeholder.name];
            });

            it(`should have a form control for ${placeholder.name}`, () => {
              expect(formControl).toBeTruthy();
            });

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

            describe('edit section', () => {

              let editSection: DebugElement;

              beforeEach(() => {
                editSection = article.query(howToFindEditSection);
              });

              it('should exist', () => {
                expect(editSection).toBeTruthy();
              });

              describe('fields', () => {

                let labels: Array<DebugElement>;
                let inputs: Array<DebugElement>;

                beforeEach(() => {
                  inputs = editSection.queryAll(howToFindInput);
                  labels = inputs.reduce((result, input) => {
                    const label = editSection.query(howToFindLabelFor(input));
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

                  const optionalOrRequired = placeholder.optional ? 'optional' : 'required';

                  let formControl: AbstractControl;
                  let label: DebugElement;
                  let input: DebugElement;

                  beforeEach(() => {
                    formControl = formGroup.controls[placeholder.name];
                    label = labels[index];
                    input = inputs[index];
                  });

                  describe(`label for ${placeholder.name}`, () => {

                    it(`should indicate ${optionalOrRequired}`, () => {
                      const suffix = placeholder.optional ? '' : '*';
                      const expectedLabel = placeholder.name + suffix;
                      expect(label.nativeElement.innerText).toBe(expectedLabel);
                    });

                  });

                  describe(`input for ${placeholder.name}`, () => {

                    it(`should be ${optionalOrRequired}`, () => {
                      const requiredAttribute = input.attributes['required'];
                      if (placeholder.optional) {
                        expect(requiredAttribute).toBeUndefined();
                      } else {
                        expect(requiredAttribute).toBe('');
                      }
                    });

                    if (!placeholder.optional) {

                      describe('when empty', () => {

                        it('form control should not be valid', () => {
                          expect(formControl.valid).toBeFalsy();
                        });

                      });

                      describe('and a value is entered', () => {

                        beforeEach(() => {
                          setValue(placeholder, input, placeholder.validValue);
                        });

                        it('form control should be valid', () => {
                          expect(formControl.valid).toBeTruthy();
                        });

                        describe('and then cleared', () => {

                          beforeEach(() => {
                            setValue(placeholder, input, placeholder.emptyValue);
                          });

                          it('form control should be invalid', () => {
                            expect(formControl.valid).toBeFalsy();
                          });

                        });

                      });

                      describe('and a value is provided', () => {

                        beforeEach(() => {
                          formControl.setValue(placeholder.validValue);
                        });

                        it('form control should be valid', () => {
                          expect(input.nativeElement.value).toBe(placeholder.validValue);
                        });

                        it('form control should be valid', () => {
                          expect(formControl.valid).toBeTruthy();
                        });

                      });

                    }

                  });

                });

              });

            });

            describe('action section', () => {

              let actionSection: DebugElement;

              beforeEach(() => {
                actionSection = article.query(howToFindActionSection);
              });

              it('should exist', () => {
                expect(actionSection).toBeTruthy();
              });

            });

          });

        });

      });

    });

});
