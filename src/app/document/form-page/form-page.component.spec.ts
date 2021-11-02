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
  && element.classes['template'];

const howToFindInput = (element: DebugElement): boolean =>
  element.name === 'input'
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

        let receivedPlacholders: Array<Placeholder>;

        beforeEach(() => {
          receivedPlacholders = getResult();
        });

        it('should have the correct length', () => {
          expect(receivedPlacholders.length).toBe(2);
        });

        describe('form', () => {
          
          let form: DebugElement;
          let labels: Array<DebugElement>;
          let inputs: Array<DebugElement>;

          beforeEach(() => {
            form = fixture.debugElement.query(howToFindForm);
            inputs = form.queryAll(howToFindInput);
            labels = inputs.reduce((result, input) => {
              const label = form.query(howToFindLabelFor(input));
              result.push(label);
              return result;
            }, new Array<DebugElement>());
          });

          it('should exist', () => {
            expect(form).toBeTruthy();
          });

          it('should have an input for each placeholder', () => {
            expect(inputs.length).toBe(expectedPlaceholders.length);
          });

          it('should have a label for each input', () => {
            expect(labels.length).toBe(expectedPlaceholders.length);
          });

        });
        
      });

    });

});
