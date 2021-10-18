import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { ArticlesPageComponent } from './articles-page.component';

class FakeActivatedRoute {
  public readonly paramMap = this.paramMapSubject.asObservable();
  constructor(
    private readonly paramMapSubject: Subject<ParamMap>
  ) {
  }
}

describe('ArticlesPageComponent', () => {
  let paramMapSubject: Subject<ParamMap>;
  let fakeActivatedRoute: FakeActivatedRoute;
  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(() => {
    paramMapSubject = new ReplaySubject<ParamMap>(1);
    fakeActivatedRoute = new FakeActivatedRoute(paramMapSubject);
  });

  afterEach(() => {
    paramMapSubject.complete();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesPageComponent],
      providers: [
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

  describe('when passed article identifier "new"', () => {

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

    beforeEach(() => {
      timesHasWasCalledCount = 0;
      paramMapSubject.next(paramMap);
      fixture.detectChanges();
    });

    it('should call has', () => {
      expect(timesHasWasCalledCount).toBe(1);
    });

    it('should display title edit field', () => {
      const element = fixture.debugElement.nativeElement;
      const titleInput = element.querySelector('input[name="title"]');
      expect(titleInput).toBeTruthy();
    });

  });  

});
