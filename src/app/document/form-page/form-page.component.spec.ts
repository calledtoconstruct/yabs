import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findElement, findOneOf } from 'src/app/find-elements-helper';
import { FormPageComponent, Step } from './form-page.component';
import { Observable, of, Subscription } from 'rxjs';
import { Placeholder, Template, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { SafeHtml } from '@angular/platform-browser';

const howToFindPageHeader = findElement('header')
  .withClass('page')
  .please();

const howToFindPageFooter = findElement('footer')
  .withClass('page')
  .please();

const howToFindForm = findElement('form')
  .withClass('template')
  .please();

const howToFindArticle = findElement('article')
  .withClass('template')
  .please();

const howToFindArticleHeader = findElement('header')
  .withClass('article')
  .please();

const howToFindArticleFooter = findElement('footer')
  .withClass('article')
  .please();

const howToFindEditSection = findElement('section')
  .withClass('edit')
  .please();

const howToFindDocumentFieldset = findElement('fieldset')
  .withClass('document')
  .please();

const documentNameInputIdentifier = '*-document-name';

const howToFindDocumentNameInput = findElement('input')
  .withAttributeValue('id', documentNameInputIdentifier)
  .withAttributeValue('name', documentNameInputIdentifier)
  .please();

const howToFindPlaceholderFieldset = findElement('fieldset')
  .withClass('placeholders')
  .please();

const howToFindAllInput = findElement('input')
  .or('select')
  .or('textarea')
  .please();

const howToFindInputFor = (placeholder: Placeholder) => findOneOf(
  element => element
    .withAttributeValue('id', placeholder.name)
    .withAttributeValue('name', placeholder.name),
  'input',
  'select',
  'textarea')
  .please();

const howToFindLabelFor = (input: DebugElement) => findElement('label')
  .withAttributeValue('for', input.attributes['id'] || 'input is missing id attribute')
  .please();

const howToFindErrorParagraph = findElement('p')
  .withClass('error-message')
  .please();

const howToFindActionSection = findElement('section')
  .withClass('action')
  .please();

const howToFindHydrateButton = findElement('button')
  .withClass('hydrate')
  .please();

const howToFindReviewArticle = findElement('article')
  .withClass('review')
  .please();

const whenLabelIsClicked = (getFields: () => [DebugElement, DebugElement]) => {

  describe('when clicked', () => {

    let label: DebugElement;
    let input: DebugElement;

    beforeEach(() => {
      [label, input] = getFields();
      label.nativeElement.click();
    });

    it('should focus input', () => {
      expect(input.nativeElement).toBe(document.activeElement);
    });

  });

};

describe('Document -> Form Page', () => {

  const documentName = 'some-document-name';
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

  const expectedDocument = 'avnaoiusdnfasdfasdfasdfa';

  let activatedRoute: FakeActivatedRoute;
  let templateService: jasmine.SpyObj<{
    templateFor: (templateIdentifier: string) => Observable<Template>,
    extractPlaceholdersFrom: (text: string) => Observable<Array<Placeholder>>,
    hydrateTemplate: (templateText: string, replacements: { [key: string]: string }) => string
  }>;

  beforeEach(() => {
    activatedRoute = new FakeActivatedRoute();
    templateService = jasmine.createSpyObj('TemplateService', {
      'templateFor': of(template),
      'extractPlaceholdersFrom': expectedPlaceholders,
      'hydrateTemplate': expectedDocument
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

  afterEach(() => {
    component.ngOnDestroy();
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

  describe('step', () => {

    let step: Step;
    let subscription: Subscription;

    beforeEach(() => {
      subscription = component.step$.subscribe(data => step = data);
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should default to form', () => {
      expect(step).toBe('form');
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

              describe('document fieldset', () => {

                let documentFieldset: DebugElement;

                beforeEach(() => {
                  documentFieldset = editSection.query(howToFindDocumentFieldset);
                });

                it('should exist', () => {
                  expect(documentFieldset).toBeTruthy();
                });

                describe('document name field', () => {

                  let documentNameInputLabel: DebugElement;
                  let documentNameInput: DebugElement;
                  let errorParagraph: DebugElement;

                  beforeEach(() => {
                    documentNameInput = documentFieldset.query(howToFindDocumentNameInput);
                    if (documentNameInput.parent) {
                      documentNameInputLabel = documentNameInput.parent.query(howToFindLabelFor(documentNameInput));
                      errorParagraph = documentNameInput.parent.query(howToFindErrorParagraph);
                    }
                  });

                  it('should exist', () => {
                    expect(documentNameInput).toBeTruthy();
                  });

                  describe('label', () => {

                    it('should exist', () => {
                      expect(documentNameInputLabel).toBeTruthy();
                    });

                    it('should contain text', () => {
                      expect(documentNameInputLabel.nativeElement.innerText).toBeTruthy();
                    });

                    it('should indicate that it is required', () => {
                      expect(documentNameInputLabel.nativeElement.innerText.endsWith('*')).toBeTruthy();
                    });

                    whenLabelIsClicked(() => [documentNameInputLabel, documentNameInput]);

                  });

                  describe('when empty', () => {

                    it('should be invalid', () => {
                      expect(formGroup.get(documentNameInputIdentifier)?.valid).toBeFalsy();
                    });

                    it('should display error message', () => {
                      expect(errorParagraph).toBeTruthy();
                    });

                  });

                  describe('when a value is provided', () => {

                    beforeEach(() => {
                      formGroup.get(documentNameInputIdentifier)?.setValue(documentName);
                      fixture.detectChanges();
                      if (documentNameInput.parent) {
                        errorParagraph = documentNameInput.parent.query(howToFindErrorParagraph);
                      }
                    });

                    it('should be valid', () => {
                      expect(formGroup.get(documentNameInputIdentifier)?.valid).toBeTruthy();
                    });

                    it('should not display error message', () => {
                      expect(errorParagraph).toBeFalsy();
                    });

                  });

                });

              });

              describe('placeholder field set', () => {

                let fieldset: DebugElement;

                beforeEach(() => {
                  fieldset = editSection.query(howToFindPlaceholderFieldset);
                });

                it('should exist', () => {
                  expect(fieldset).toBeTruthy();
                });

                describe('placeholder fields', () => {

                  let labels: Array<DebugElement>;
                  let inputs: Array<DebugElement>;

                  beforeEach(() => {
                    inputs = fieldset.queryAll(howToFindAllInput);
                    labels = inputs.reduce((result, input) => {
                      const label = fieldset.query(howToFindLabelFor(input));
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

                });

                expectedPlaceholders.forEach((placeholder) => {

                  describe(placeholder.name, () => {

                    let formControl: AbstractControl;
                    let label: DebugElement;
                    let input: DebugElement;
                    let errorParagraph: DebugElement;

                    beforeEach(() => {
                      formControl = formGroup.controls[placeholder.name];
                      input = form.query(howToFindInputFor(placeholder));
                      if (input.parent) {
                        label = input.parent.query(howToFindLabelFor(input));
                        errorParagraph = input.parent.query(howToFindErrorParagraph);
                      }
                    });

                    if (placeholder.optional) {

                      describe('label', () => {

                        it('should not have required indicator', () => {
                          expect(label.nativeElement.innerText).toBe(placeholder.name);
                        });

                        whenLabelIsClicked(() => [label, input]);

                      });

                      describe('input', () => {

                        it('should not be required', () => {
                          expect(input.attributes['required']).toBeUndefined();
                        });

                        it('error message should not be displayed', () => {
                          expect(errorParagraph).toBeFalsy();
                        });

                      });

                    } else {

                      describe('label', () => {

                        it('should have required indicator', () => {
                          expect(label.nativeElement.innerText.endsWith('*')).toBeTruthy();
                        });

                        whenLabelIsClicked(() => [label, input]);

                      });

                      describe('input', () => {

                        it('should be required', () => {
                          expect(input.attributes['required']).toBeDefined();
                        });

                        describe('when empty', () => {

                          it('form control should not be valid', () => {
                            expect(formControl.valid).toBeFalsy();
                          });

                          it('form control errors should contain required', () => {
                            expect(formControl.errors?.['required']).toBeDefined();
                          });

                          it('error message should be displayed', () => {
                            expect(errorParagraph).toBeTruthy();
                          });

                        });

                        describe('and a value is entered', () => {

                          beforeEach(() => {
                            setValue(placeholder, input, placeholder.validValue);
                            fixture.detectChanges();
                            if (input.parent) {
                              errorParagraph = input.parent.query(howToFindErrorParagraph);
                            }
                          });

                          it('form control should be valid', () => {
                            expect(formControl.valid).toBeTruthy();
                          });

                          it('form control errors should not contain required', () => {
                            expect(formControl.errors?.['required']).toBeUndefined();
                          });

                          it('form control should be dirty', () => {
                            expect(formControl.dirty).toBeTruthy();
                          });

                          it('error message should not be displayed', () => {
                            expect(errorParagraph).toBeFalsy();
                          });

                          describe('and then cleared', () => {

                            beforeEach(() => {
                              setValue(placeholder, input, placeholder.emptyValue);
                              fixture.detectChanges();
                              if (input.parent) {
                                errorParagraph = input.parent.query(howToFindErrorParagraph);
                              }
                            });

                            it('form control should not be valid', () => {
                              expect(formControl.valid).toBeFalsy();
                            });

                            it('form control errors should contain required', () => {
                              expect(formControl.errors?.['required']).toBeDefined();
                            });

                            it('error message should be displayed', () => {
                              expect(errorParagraph).toBeTruthy();
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

              describe('hydrate button', () => {

                let hydrateButton: DebugElement;

                beforeEach(() => {
                  hydrateButton = actionSection.query(howToFindHydrateButton);
                });

                it('should exist', () => {
                  expect(hydrateButton).toBeTruthy();
                });

                it('should contain a label', () => {
                  expect(hydrateButton.nativeElement.innerText).toBeTruthy();
                });

                describe('when form is invalid', () => {

                  it('should be disabled', () => {
                    expect(hydrateButton.nativeElement.disabled).toBeTruthy();
                  });

                });

                describe('when form is valid', () => {

                  beforeEach(() => {
                    expectedPlaceholders.forEach(placeholder => {
                      formGroup.get(placeholder.name)?.setValue(placeholder.validValue);
                    });
                    formGroup.get('*-document-name')?.setValue(documentName);
                    fixture.detectChanges();
                  });

                  it('should be enabled', () => {
                    expect(hydrateButton.nativeElement.disabled).toBeFalsy();
                  });

                  describe('and is clicked', () => {

                    let hydrateTemplateSpy: jasmine.Spy;

                    beforeEach(() => {
                      hydrateTemplateSpy = spyOn(component, 'hydrateTemplate');
                      hydrateButton.nativeElement.click();
                    });

                    it('should invoke hydrate document method', () => {
                      expect(hydrateTemplateSpy).toHaveBeenCalled();
                    });

                  });

                });

              });

            });

          });

        });

      });

      describe('hydrate document', () => {

        let formGroup: FormGroup;
        let formGroupSubscription: Subscription;
        let replacements: { [key: string]: string };
        let step: Step;
        let stepSubscription: Subscription;

        beforeEach(() => {
          formGroupSubscription = component.formGroup$.subscribe(fg => formGroup = fg);
          stepSubscription = component.step$.subscribe(stp => step = stp);
          replacements = {};
          expectedPlaceholders.forEach(placeholder => {
            formGroup.get(placeholder.name)?.setValue(placeholder.validValue);
            replacements[placeholder.name] = placeholder.validValue;
          });
          formGroup.get('*-document-name')?.setValue(documentName);
          component.hydrateTemplate(template.text, formGroup);
        });

        afterEach(() => {
          formGroupSubscription.unsubscribe();
          stepSubscription.unsubscribe();
        });

        it('should invoke hydrate template on service', () => {
          expect(templateService.hydrateTemplate).toHaveBeenCalledTimes(1);
        });

        it('should invoke hydrate template on service with template text and form group', () => {
          expect(templateService.hydrateTemplate).toHaveBeenCalledWith(template.text, replacements);
        });

        it('should progress to the review step', () => {
          expect(step).toBe('review');
        });

      });

      describe('when step is review and markdown is emitted', () => {

        const markdown = '# some document\n## with markdown';

        let form: DebugElement;
        let html: SafeHtml;
        let htmlSubscription: Subscription;

        beforeEach(() => {
          htmlSubscription = component.html$.subscribe(data => html = data);
          component.step$.next('review');
          component.markdown$.next(markdown);
          fixture.detectChanges();
          form = fixture.debugElement.query(howToFindForm);
        });

        afterEach(() => {
          htmlSubscription.unsubscribe();
        });

        it('should not show form', () => {
          expect(form).toBeFalsy();
        });

        it('should produce html', () => {
          expect(html).toBeTruthy();
        });

        describe('review article', () => {

          let article: DebugElement;

          beforeEach(() => {
            article = fixture.debugElement.query(howToFindReviewArticle);
          });

          it('should exist', () => {
            expect(article).toBeTruthy();
          });

        });

      });

    });

});
