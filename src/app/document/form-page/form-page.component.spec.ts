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

const howToFindDocumentNameInput = (element: DebugElement): boolean =>
  element.name === 'input'
  && !!element.attributes['id']
  && element.attributes['id'] === '*-document-name'
  && !!element.attributes['name']
  && element.attributes['name'] === '*-document-name';

const howToFindPlaceholderFieldset = (element: DebugElement): boolean =>
  element.name === 'fieldset'
  && !!element.classes['placeholders'];

const howToFindAllInput = (element: DebugElement): boolean =>
  (element.name === 'input' || element.name === 'select' || element.name === 'textarea');

const howToFindInputFor = (placeholder: Placeholder) =>
  (element: DebugElement): boolean =>
    (element.name === 'input' || element.name === 'select' || element.name === 'textarea')
    && !!element.attributes['id']
    && element.attributes['id'] === placeholder.name
    && !!element.attributes['name']
    && element.attributes['name'] === placeholder.name;

const howToFindLabelFor = (input: DebugElement) =>
  (element: DebugElement): boolean =>
    element.name === 'label'
    && !!element.attributes['for']
    && element.attributes['for'] === input.attributes['id'];

const howToFindErrorParagraph = (element: DebugElement): boolean =>
  element.name === 'p'
  && !!element.classes['error-message'];

const howToFindActionSection = (element: DebugElement): boolean =>
  element.name === 'section'
  && !!element.classes['action'];

const howToFindCreateButton = (element: DebugElement): boolean =>
  element.name === 'button'
  && !!element.classes['create'];

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
    createDocument: (templateText: string, replacements: { [key: string]: string }) => string
  }>;

  beforeEach(() => {
    activatedRoute = new FakeActivatedRoute();
    templateService = jasmine.createSpyObj('TemplateService', {
      'templateFor': of(template),
      'extractPlaceholdersFrom': expectedPlaceholders,
      'createDocument': expectedDocument
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

              describe('document name field', () => {

                let documentNameInput: DebugElement;

                beforeEach(() => {
                  documentNameInput = editSection.query(howToFindDocumentNameInput);
                });

                it('should exist', () => {
                  expect(documentNameInput).toBeTruthy();
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
  
                    const whenClicked = () => {
  
                      describe('when clicked', () => {
  
                        beforeEach(() => {
                          label.nativeElement.click();
                        });
  
                        it('should focus input', () => {
                          expect(input.nativeElement).toBe(document.activeElement);
                        });
  
                      });
  
                    };
  
                    if (placeholder.optional) {
  
                      describe('label', () => {
  
                        it('should not have required indicator', () => {
                          expect(label.nativeElement.innerText).toBe(placeholder.name);
                        });
  
                        whenClicked();
  
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
                          expect(label.nativeElement.innerText).toBe(`${placeholder.name}*`);
                        });
  
                        whenClicked();
  
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

              describe('create button', () => {

                let createButton: DebugElement;

                beforeEach(() => {
                  createButton = actionSection.query(howToFindCreateButton);
                });

                it('should exist', () => {
                  expect(createButton).toBeTruthy();
                });

                it('should contain a label', () => {
                  expect(createButton.nativeElement.innerText).toBeTruthy();
                });

                describe('when form is invalid', () => {

                  it('should be disabled', () => {
                    expect(createButton.nativeElement.disabled).toBeTruthy();
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
                    expect(createButton.nativeElement.disabled).toBeFalsy();
                  });

                  describe('and is clicked', () => {

                    let createDocumentSpy: jasmine.Spy;

                    beforeEach(() => {
                      createDocumentSpy = spyOn(component, 'createDocument');
                      createButton.nativeElement.click();
                    });

                    it('should invoke create document method', () => {
                      expect(createDocumentSpy).toHaveBeenCalled();
                    });

                  });

                });

              });

            });

          });

        });

      });

      describe('create document', () => {

        let formGroup: FormGroup;
        let subscription: Subscription;
        let replacements: { [key: string]: string };

        beforeEach(() => {
          subscription = component.formGroup$.subscribe(fg => formGroup = fg);
          replacements = {};
          expectedPlaceholders.forEach(placeholder => {
            formGroup.get(placeholder.name)?.setValue(placeholder.validValue);
            replacements[placeholder.name] = placeholder.validValue;
          });
          formGroup.get('*-document-name')?.setValue(documentName);
          component.createDocument(template.text, formGroup);
        });

        afterEach(() => {
          subscription.unsubscribe();
        });

        it('should invoke create document on service', () => {
          expect(templateService.createDocument).toHaveBeenCalledTimes(1);
        });

        it('should invoke create document on service with template text and form group', () => {
          expect(templateService.createDocument).toHaveBeenCalledWith(template.text, replacements);
        });

      });

    });

});
