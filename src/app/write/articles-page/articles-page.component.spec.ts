import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FakeUserService } from '../../fake/user-service.fake';
import { UserService } from '../../user.service';
import { ArticleService } from '../article.service';
import { ArticlesPageComponent } from './articles-page.component';
import { CountContainer } from '../../test/count-container.type';
import { FakeActivatedRoute } from '../../fake/activated-route.fake';
import { FakeArticleService } from '../../fake/article-service.fake';

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

describe('Write -> Articles Page', () => {

  let userService: FakeUserService;
  let articleService: FakeArticleService;
  let activatedRoute: FakeActivatedRoute;
  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(() => {
    userService = new FakeUserService();
    articleService = new FakeArticleService();
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
        { provide: ArticleService, useValue: articleService},
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user is logged in', () => {

    const displayName = 'abvsunvj';
    const user = <User>{
      displayName: displayName
    };

    beforeEach(() => {
      userService.setUpLoggedInAs(user);
    });

    describe('when passed article identifier "new"', () => {

      let titleInput: DebugElement;
      let textInput: DebugElement;
      let saveOnlyRadio: DebugElement;
      let saveOnlyLabel: DebugElement;
      let saveAndRequestEditRadio: DebugElement;
      let saveAndRequestEditLabel: DebugElement;
      let saveAndRequestCheckRadio: DebugElement;
      let saveAndRequestCheckLabel: DebugElement;
      let doneButton: DebugElement;
      let hasWasCalledFor: CountContainer;

      beforeEach(() => {
        hasWasCalledFor = activatedRoute.nextParamMap({
          articleIdentifier: 'new'
        });
        fixture.detectChanges();
        const element = fixture.debugElement;
        titleInput = element.query(howToFindTitleInput);
        textInput = element.query(howToFindTextInput);
        saveOnlyRadio = element.query(howToFindSaveOnlyRadio);
        saveOnlyLabel = element.query(howToFindSaveOnlyLabel);
        saveAndRequestEditRadio = element.query(howToFindSaveAndRequestEditRadio);
        saveAndRequestEditLabel = element.query(howToFindSaveAndRequestEditLabel);
        saveAndRequestCheckRadio = element.query(howToFindSaveAndRequestCheckRadio);
        saveAndRequestCheckLabel = element.query(howToFindSaveAndRequestCheckLabel);
        doneButton = element.query(howToFindDoneButton);
      });

      it('should expose form group', () => {
        expect(component.formGroup).toBeTruthy();
      });

      describe('form group', () => {

        let formControlNames: Array<string>;

        beforeEach(() => {
          formControlNames = Object.keys(component.formGroup.value);
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

      it('should call has', () => {
        expect(hasWasCalledFor['articleIdentifier']).toBe(1);
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

        it('should default to checked', () => {
          const value = saveOnlyRadio.nativeElement['checked'];
          expect(value).toBeTruthy();
        });

      });

      describe('save and request edit radio button', () => {

        it('should default to not-checked', () => {
          const value = saveAndRequestEditRadio.nativeElement['checked'];
          expect(value).toBeFalsy();
        });

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

        it('should default to not-checked', () => {
          const value = saveAndRequestCheckRadio.nativeElement['checked'];
          expect(value).toBeFalsy();
        });

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

      describe('when user enters a title', () => {

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

      describe('when user clicks done button', () => {

        beforeEach(() => {
          doneButton.nativeElement.click();
        });

        it('should call aritcle service save article', () => {
          expect(articleService.saveArticleCalled).toBe(1);
        });

      });

    });

  });

  describe('when user is not logged in', () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
    });

    describe('when passed article identifier "new"', () => {

      let hasWasCalledFor: CountContainer;

      beforeEach(() => {
        hasWasCalledFor = activatedRoute.nextParamMap({
          articleIdentifier: 'new'
        });
        fixture.detectChanges();
      });

      it('should not call has', () => {
        expect(hasWasCalledFor['articleIdentifier']).toBe(0);
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
