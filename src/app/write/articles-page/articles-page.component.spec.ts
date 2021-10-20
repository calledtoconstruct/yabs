import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '@firebase/auth';
import { ReplaySubject, Subject } from 'rxjs';
import { FakeUserService } from 'src/app/FakeUserService';
import { UserService } from 'src/app/user.service';
import { ArticlesPageComponent } from './articles-page.component';

class FakeActivatedRoute {
  public readonly paramMap = this.paramMapSubject.asObservable();
  constructor(
    private readonly paramMapSubject: Subject<ParamMap>
  ) {
  }
}

let timesHasWasCalledCount: number;

const paramMap = <ParamMap>{
  get: (name: string): string | null => {
    return name === 'articleIdentifier'
      ? 'new'
      : null
  },
  has: (name: string): boolean => {
    timesHasWasCalledCount++;
    return name === 'articleIdentifier';
  }
};

const howToFindTitleEditField = (element: DebugElement) =>
  element.name === 'input'
  && !!element.attributes['name']
  && element.attributes['name'] === 'title';

const howToFindTextEditField = (element: DebugElement) =>
  element.name === 'textarea'
  && !!element.attributes['name']
  && element.attributes['name'] === 'text';

describe('ArticlesPageComponent', () => {

  let userService: FakeUserService;
  let paramMapSubject: Subject<ParamMap>;
  let fakeActivatedRoute: FakeActivatedRoute;
  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(() => {
    userService = new FakeUserService();
    paramMapSubject = new ReplaySubject<ParamMap>(1);
    fakeActivatedRoute = new FakeActivatedRoute(paramMapSubject);
  });

  afterEach(() => {
    paramMapSubject.complete();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ArticlesPageComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
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

    afterEach(() => {
      userService.tearDown();
    });

    describe('when passed article identifier "new"', () => {

      let titleInput: DebugElement;
      let textInput: DebugElement;

      beforeEach(() => {
        timesHasWasCalledCount = 0;
        paramMapSubject.next(paramMap);
        fixture.detectChanges();
        const element = fixture.debugElement;
        titleInput = element.query(howToFindTitleEditField);
        textInput = element.query(howToFindTextEditField);
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

      });

      it('should call has', () => {
        expect(timesHasWasCalledCount).toBe(1);
      });

      it('should display title edit field', () => {
        expect(titleInput).toBeTruthy();
      });

      it('should display text edit field', () => {
        expect(textInput).toBeTruthy();
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

    });

  });

  describe('when user is not logged in', () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
    });

    afterEach(() => {
      userService.tearDown();
    });

    describe('when passed article identifier "new"', () => {

      beforeEach(() => {
        timesHasWasCalledCount = 0;
        paramMapSubject.next(paramMap);
        fixture.detectChanges();
      });

      it('should not call has', () => {
        expect(timesHasWasCalledCount).toBe(0);
      });

      it('should not display title edit field', () => {
        const element = fixture.debugElement;
        const titleInput = element.query(howToFindTitleEditField);
        expect(titleInput).toBeFalsy();
      });

    });

  });

});
