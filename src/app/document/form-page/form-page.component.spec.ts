import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Template, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FormPageComponent } from './form-page.component';

describe('Document -> Form Page', () => {

  const template = <Template>{

  };

  let activatedRoute: FakeActivatedRoute;
  let templateService: jasmine.SpyObj<{
    templateFor: (templateIdentifier: string) => Observable<Template>
  }>;

  beforeEach(() => {
    activatedRoute = new FakeActivatedRoute();
    templateService = jasmine.createSpyObj('TemplateService', {
      'templateFor': of(template)
    });
  });

  afterEach(() => {
    activatedRoute.tearDown();
  });

  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPageComponent ],
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

});
