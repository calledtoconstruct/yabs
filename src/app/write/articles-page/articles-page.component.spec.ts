import { Article, WriteArticleService } from '../write-article.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticlesPageComponent } from './articles-page.component';
import { CountContainer } from '../../test/count-container.type';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from '../../fake/activated-route.fake';
import { FakeUserService } from '../../fake/user-service.fake';
import { FakeWriteArticleService } from '../fake/write-article-service.fake';
import { User } from '@angular/fire/auth';
import { UserService } from '../../user.service';

const howToFindTitleInput = (element: DebugElement) =>
  element.name === 'input'
  && !!element.attributes['name']
  && element.attributes['name'] === 'title';

const howToFindTextInput = (element: DebugElement) =>
  element.name === 'textarea'
  && !!element.attributes['name']
  && element.attributes['name'] === 'text';

const howToFindSaveOnlyRadio = (element: DebugElement) =>
  element.name === 'input'
  && !!element.attributes['type']
  && element.attributes['type'] === 'radio'
  && !!element.attributes['name']
  && element.attributes['name'] === 'operation'
  && !!element.attributes['value']
  && element.attributes['value'] === 'saveOnly'
  && !!element.attributes['id']
  && element.attributes['id'] === 'saveOnlyOperation';

const howToFindSaveOnlyLabel = (element: DebugElement) =>
  element.name === 'label'
  && !!element.attributes['for']
  && element.attributes['for'] === 'saveOnlyOperation';

const howToFindSaveAndRequestEditRadio = (element: DebugElement) =>
  element.name === 'input'
  && !!element.attributes['type']
  && element.attributes['type'] === 'radio'
  && !!element.attributes['name']
  && element.attributes['name'] === 'operation'
  && !!element.attributes['value']
  && element.attributes['value'] === 'saveAndRequestEdit'
  && !!element.attributes['id']
  && element.attributes['id'] === 'saveAndRequestEditOperation';

const howToFindSaveAndRequestEditLabel = (element: DebugElement) =>
  element.name === 'label'
  && !!element.attributes['for']
  && element.attributes['for'] === 'saveAndRequestEditOperation';

const howToFindSaveAndRequestCheckRadio = (element: DebugElement) =>
  element.name === 'input'
  && !!element.attributes['type']
  && element.attributes['type'] === 'radio'
  && !!element.attributes['name']
  && element.attributes['name'] === 'operation'
  && !!element.attributes['value']
  && element.attributes['value'] === 'saveAndRequestCheck'
  && !!element.attributes['id']
  && element.attributes['id'] === 'saveAndRequestCheckOperation';

const howToFindSaveAndRequestCheckLabel = (element: DebugElement) =>
  element.name === 'label'
  && !!element.attributes['for']
  && element.attributes['for'] === 'saveAndRequestEditOperation';

const howToFindDoneButton = (element: DebugElement): boolean =>
  element.name === 'button'
  && !!element.nativeElement.innerText
  && element.nativeElement.innerText === 'Done';

const howToFindPageHeader = (element: DebugElement): boolean =>
  element.name === 'header'
  && !!element.classes['page'];

const howToFindArticle = (element: DebugElement): boolean =>
  element.name === 'article'
  && !!element.classes['article'];

const howToFindArticleForm = (element: DebugElement): boolean =>
  element.name === 'form'
  && !!element.classes['article'];

const howToFindArticleHeader = (element: DebugElement): boolean =>
  element.name === 'header'
  && !!element.classes['article'];

const howToFindArticleFooter = (element: DebugElement): boolean =>
  element.name === 'footer'
  && !!element.classes['article'];

const howToFindPageFooter = (element: DebugElement): boolean =>
  element.name === 'footer'
  && !!element.classes['page'];

describe('Write -> Articles Page', () => {

  let userService: FakeUserService;
  let articleService: FakeWriteArticleService;
  let activatedRoute: FakeActivatedRoute;

  beforeEach(() => {
    userService = new FakeUserService();
    articleService = new FakeWriteArticleService();
    activatedRoute = new FakeActivatedRoute();
  });

  afterEach(() => {
    articleService.tearDown();
    activatedRoute.tearDown();
    userService.tearDown();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ArticlesPageComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: WriteArticleService, useValue: articleService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  });

  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('form group', () => {

    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = component.formGroup;
    });

    it('should exist', () => {
      expect(formGroup).toBeTruthy();
    });

    describe('controls', () => {

      let formControlNames: Array<string>;

      beforeEach(() => {
        formControlNames = Object.keys(formGroup.value);
      });

      it('should contain title', () => {
        expect(formControlNames).toContain('title');
      });

      it('should contain text', () => {
        expect(formControlNames).toContain('text');
      });

      it('should contain operation', () => {
        expect(formControlNames).toContain('operation');
      });

    });

  });

  const displayName = 'abvsunvj';
  const user = <User>{
    displayName: displayName
  };

  FakeUserService.whenUserIsLoggedIn(() => [userService, fixture], user, () => {

    const regarlessOfArticleIdentifier = (
      articleIdentifier: string,
      thenTitleInput: (get: () => DebugElement) => void,
      thenTextInput: (get: () => DebugElement) => void,
      thenSaveOnly: (get: () => DebugElement) => void,
      thenSaveAndRequestEdit: (get: () => DebugElement) => void,
      thenSaveAndRequestCheck: (get: () => DebugElement) => void,
      then: () => void
    ) => {

      describe('when route is activated', () => {

        let hasWasCalledFor: CountContainer;
        let getWasCalledFor: CountContainer;

        beforeEach(() => {
          [hasWasCalledFor, getWasCalledFor] = activatedRoute.nextParamMap({
            articleIdentifier: articleIdentifier
          });
          fixture.detectChanges();
        });

        it('should call has for article identifier route parameter', () => {
          expect(hasWasCalledFor['articleIdentifier']).toBe(1);
        });

        it('should call get for article identifier route parameter', () => {
          expect(getWasCalledFor['articleIdentifier']).toBe(1);
        });

        describe('header', () => {

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

        describe('form', () => {

          let form: DebugElement;

          beforeEach(() => {
            form = fixture.debugElement.query(howToFindArticleForm);
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

            let titleInput: DebugElement;
            let textInput: DebugElement;
            let saveOnlyRadio: DebugElement;
            let saveOnlyLabel: DebugElement;
            let saveAndRequestEditRadio: DebugElement;
            let saveAndRequestEditLabel: DebugElement;
            let saveAndRequestCheckRadio: DebugElement;
            let saveAndRequestCheckLabel: DebugElement;
            let doneButton: DebugElement;

            beforeEach(() => {
              titleInput = article.query(howToFindTitleInput);
              textInput = article.query(howToFindTextInput);
              saveOnlyRadio = article.query(howToFindSaveOnlyRadio);
              saveOnlyLabel = article.query(howToFindSaveOnlyLabel);
              saveAndRequestEditRadio = article.query(howToFindSaveAndRequestEditRadio);
              saveAndRequestEditLabel = article.query(howToFindSaveAndRequestEditLabel);
              saveAndRequestCheckRadio = article.query(howToFindSaveAndRequestCheckRadio);
              saveAndRequestCheckLabel = article.query(howToFindSaveAndRequestCheckLabel);
              doneButton = article.query(howToFindDoneButton);
            });

            it('should display title edit field', () => {
              expect(titleInput).toBeTruthy();
            });

            it('should display text edit field', () => {
              expect(textInput).toBeTruthy();
            });

            it('should display save only radio button', () => {
              expect(saveOnlyRadio).toBeTruthy();
            });

            it('should display save only label', () => {
              expect(saveOnlyLabel).toBeTruthy();
            });

            it('should display save and request edit radio button', () => {
              expect(saveAndRequestEditRadio).toBeTruthy();
            });

            it('should display save and request edit label', () => {
              expect(saveAndRequestEditLabel).toBeTruthy();
            });

            it('should display save and request check radio button', () => {
              expect(saveAndRequestCheckRadio).toBeTruthy();
            });

            it('should display save and request check label', () => {
              expect(saveAndRequestCheckLabel).toBeTruthy();
            });

            it('should display done button', () => {
              expect(doneButton).toBeTruthy();
            });

            describe('save only radio button', () => {

              thenSaveOnly(() => saveOnlyRadio);

            });

            describe('save and request edit radio button', () => {

              thenSaveAndRequestEdit(() => saveAndRequestEditRadio);

              describe('when clicked', () => {

                let operationValue: string;

                beforeEach(() => {
                  saveAndRequestEditRadio.nativeElement.click();
                  operationValue = component.formGroup.value['operation'];
                });

                it('should update form group', () => {
                  expect(operationValue).toBe('saveAndRequestEdit');
                });

              });

            });

            describe('save and request check radio button', () => {

              thenSaveAndRequestCheck(() => saveAndRequestCheckRadio);

              describe('when clicked', () => {

                let operationValue: string;

                beforeEach(() => {
                  saveAndRequestCheckRadio.nativeElement.click();
                  operationValue = component.formGroup.value['operation'];
                });

                it('should update form group', () => {
                  expect(operationValue).toBe('saveAndRequestCheck');
                });

              });

            });

            describe('title input', () => {

              thenTitleInput(() => titleInput);

              describe('when the user enters text', () => {

                const title = 'byauvdhygdyf';
                let titleValue: string;

                beforeEach(() => {
                  titleInput.nativeElement.value = title;
                  titleInput.nativeElement.dispatchEvent(new Event('input'));
                  titleValue = component.formGroup.value['title'];
                });

                it('should update form group value', () => {
                  expect(titleValue).toBe(title);
                });

              });

            });

            describe('text input', () => {

              thenTextInput(() => textInput);

              describe('when user enters text', () => {

                const text = 'uybusydufdhfsdfjnagasdjfkjsldfj';
                let textValue: string;

                beforeEach(() => {
                  textInput.nativeElement.value = text;
                  textInput.nativeElement.dispatchEvent(new Event('input'));
                  textValue = component.formGroup.value['text'];
                });

                it('should update form group value', () => {
                  expect(textValue).toBe(text);
                });

              });

            });

            describe('when user clicks done button', () => {

              beforeEach(() => {
                doneButton.nativeElement.click();
              });

              it('should call save article', () => {
                expect(articleService.saveArticleCalled).toBe(1);
              });

              it('should pass article to save article', () => {
                expect(articleService.articleToSave).toBeTruthy();
              });

            });

          });

        });

        describe('footer', () => {

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

        then();

      });

    };

    describe('when passed article identifier "new"', () => {

      const thenTitleInput = (get: () => DebugElement): void => {

        it('should default to empty', () => {
          const titleInput = get();
          const value = titleInput.nativeElement['value'];
          expect(value).toBe('');
        });

      };

      const thenTextInput = (get: () => DebugElement): void => {

        it('should default to empty', () => {
          const textInput = get();
          const value = textInput.nativeElement['value'];
          expect(value).toBe('');
        });

      };

      const thenSaveOnly = (get: () => DebugElement): void => {

        it('should default to checked', () => {
          const saveOnlyRadio = get();
          const value = saveOnlyRadio.nativeElement['checked'];
          expect(value).toBeTruthy();
        });

      };

      const thenSaveAndRequestEdit = (get: () => DebugElement): void => {

        it('should default to not-checked', () => {
          const saveAndRequestEditRadio = get();
          const value = saveAndRequestEditRadio.nativeElement['checked'];
          expect(value).toBeFalsy();
        });

      };

      const thenSaveAndRequestCheck = (get: () => DebugElement): void => {

        it('should default to not-checked', () => {
          const saveAndRequestCheckRadio = get();
          const value = saveAndRequestCheckRadio.nativeElement['checked'];
          expect(value).toBeFalsy();
        });

      };

      regarlessOfArticleIdentifier(
        'new',
        thenTitleInput,
        thenTextInput,
        thenSaveOnly,
        thenSaveAndRequestEdit,
        thenSaveAndRequestCheck,
        () => {

          it('should not call article service', () => {
            const times = Object.keys(articleService.articleCalledFor)
              .map((key: string) => articleService.articleCalledFor[key])
              .reduce((accumulator, value) => accumulator + value, 0);
            expect(times).toBe(0);
          });

        });

    });

    [
      { articleIdentifier: 100, title: 'title-100', text: 'text-100', operation: 'saveOnly' },
      { articleIdentifier: 200, title: 'title-200', text: 'text-200', operation: 'saveAndRequestEdit' },
      { articleIdentifier: 300, title: 'title-300', text: 'text-300', operation: 'saveAndRequestCheck' },
    ].forEach(scenario => {

      const articleIdentifier = scenario.articleIdentifier;
      const title = scenario.title;
      const text = scenario.text;
      const operation = scenario.operation;
      const saveOnlyChecked = scenario.operation === 'saveOnly';
      const saveAndRequestEditChecked = scenario.operation === 'saveAndRequestEdit';
      const saveAndRequestCheckChecked = scenario.operation === 'saveAndRequestCheck';

      describe(`when passed article identifier '${articleIdentifier}'`, () => {

        beforeEach(() => {
          articleService.nextArticleFor(<Article>{
            articleIdentifier: articleIdentifier,
            title: title,
            text: text,
            operation: operation
          });
          fixture.detectChanges();
        });

        const thenTitleInput = (get: () => DebugElement): void => {

          it(`should default to ${title}`, () => {
            const titleInput = get();
            const value = titleInput.nativeElement['value'];
            expect(value).toBe(title);
          });

        };

        const thenTextInput = (get: () => DebugElement): void => {

          it(`should default to ${text}`, () => {
            const textInput = get();
            const value = textInput.nativeElement['value'];
            expect(value).toBe(text);
          });

        };

        const thenSaveOnly = (get: () => DebugElement): void => {

          it(`should default to ${saveOnlyChecked ? 'checked' : 'not-checked'}`, () => {
            const saveOnlyRadio = get();
            const value = saveOnlyRadio.nativeElement['checked'];
            expect(value).toBe(saveOnlyChecked);
          });

        };

        const thenSaveAndRequestEdit = (get: () => DebugElement): void => {

          it(`should default to ${saveAndRequestEditChecked ? 'checked' : 'not-checked'}`, () => {
            const saveAndRequestEditRadio = get();
            const value = saveAndRequestEditRadio.nativeElement['checked'];
            expect(value).toBe(saveAndRequestEditChecked);
          });

        };

        const thenSaveAndRequestCheck = (get: () => DebugElement): void => {

          it(`should default to ${saveAndRequestCheckChecked ? 'checked' : 'not-checked'}`, () => {
            const saveAndRequestCheckRadio = get();
            const value = saveAndRequestCheckRadio.nativeElement['checked'];
            expect(value).toBe(saveAndRequestCheckChecked);
          });

        };

        regarlessOfArticleIdentifier(
          articleIdentifier.toString(),
          thenTitleInput,
          thenTextInput,
          thenSaveOnly,
          thenSaveAndRequestEdit,
          thenSaveAndRequestCheck,
          () => {

            it(`should call article service for ${articleIdentifier}`, () => {
              expect(articleService.articleCalledFor[articleIdentifier]).toBe(1);
            });

          });

      });

    });

  });

  FakeUserService.whenUserIsNotLoggedIn(() => [userService, fixture], () => {

    describe('when passed article identifier "new"', () => {

      let hasWasCalledFor: CountContainer;
      let getWasCalledFor: CountContainer;

      beforeEach(() => {
        [hasWasCalledFor, getWasCalledFor] = activatedRoute.nextParamMap({
          articleIdentifier: 'new'
        });
        fixture.detectChanges();
      });

      it('should call has for article identifier route parameter', () => {
        expect(hasWasCalledFor['articleIdentifier']).toBeGreaterThan(0);
      });

      it('should call get for article identifier route parameter', () => {
        expect(getWasCalledFor['articleIdentifier']).toBeGreaterThan(0);
      });

      it('should not call article service', () => {
        const times = Object.keys(articleService.articleCalledFor)
          .map((key: string) => articleService.articleCalledFor[key])
          .reduce((accumulator, value) => accumulator + value, 0);
        expect(times).toBe(0);
      });

      it('should not display title edit field', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindTitleInput);
        expect(target).toBeFalsy();
      });

      it('should not display text edit field', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindTextInput);
        expect(target).toBeFalsy();
      });

      it('should not display save only radio button', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindSaveOnlyRadio);
        expect(target).toBeFalsy();
      });

      it('should not display save only label', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindSaveOnlyLabel);
        expect(target).toBeFalsy();
      });

      it('should not display save and request edit radio button', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindSaveAndRequestEditRadio);
        expect(target).toBeFalsy();
      });

      it('should not display save and request edit radio button', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindSaveAndRequestEditLabel);
        expect(target).toBeFalsy();
      });

      it('should not display save and request check radio button', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindSaveAndRequestCheckRadio);
        expect(target).toBeFalsy();
      });

      it('should not display save and request check radio button', () => {
        const element = fixture.debugElement;
        const target = element.query(howToFindSaveAndRequestCheckLabel);
        expect(target).toBeFalsy();
      });

    });

  });

});
