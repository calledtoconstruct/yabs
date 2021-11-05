import { Placeholder, Template, TemplateService } from './template.service';
import { Subscription } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('TemplateService', () => {
  let service: TemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('template for', () => {

    const templateIdentifier = 'asdkfjasdf';

    let template: Template;
    let subscription: Subscription;

    beforeEach(() => {
      const observable = service.templateFor(templateIdentifier);
      subscription = observable.subscribe(data => template = data);
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit template', () => {
      expect(template).toBeTruthy();
    });

  });

  describe('kitchen sink template', () => {

    const validPlaceholders = Array<string>(
      '${name}',
      '${placeholders: string}',
      '${this-one: number, optional}',
      '${valida-tion}',
      '${valida_tion}',
      '${Validation}',
      '${validation}',
      '${validation: string}',
      '${validation: number}',
      '${validation: phone-number}',
      '${validation: currency}',
      '${validation: date}',
      '${validation: time}',
      '${validation: date-time}',
      '${pattern-to-match, break}',
      '${pattern-to-match, keep}',
      '${pattern-to-match, table[abc,asf]}',
      '${pattern-to-match:string, break}',
      '${pattern-to-match: string, keep}',
      '${pattern-to-match: string, table[abc,asf]}',
      '${pattern-to-match: string, break, table[asdf]}',
      '${pattern-to-match: string, keep, table[abc,asf]}.',
      '${pattern-to-match: string,  break,\tkeep}',
      '${pattern-to-match: string, break, keep, table[asdf]}',
      '${placeholder-name: select[Yes|No|Maybe]}'
    );

    const template = validPlaceholders.join(' asdfadf ');

    describe('extract placeholders for', () => {

      let placeholders: Array<Placeholder>;

      beforeEach(() => {
        placeholders = service.extractPlaceholdersFrom(template);
      });

      it('should return an array of placeholders', () => {
        expect(placeholders).toBeTruthy();
      });

      it('should return twenty five placeholders', () => {
        expect(placeholders.length).toBe(25);
      });

      it('should return placeholder for pattern-to-match with break option', () => {
        const placeholder = placeholders[14];
        expect(placeholder.name).toBe('pattern-to-match');
        expect(placeholder.dataType).toBe('string');
        expect(placeholder.break).toBe(true);
        expect(placeholder.keep).toBe(false);
      });

      it('should return placeholder for pattern-to-match of type string with break and keep options', () => {
        const placeholder = placeholders[22];
        expect(placeholder.name).toBe('pattern-to-match');
        expect(placeholder.dataType).toBe('string');
        expect(placeholder.break).toBe(true);
        expect(placeholder.keep).toBe(true);
      });

      it('should return placeholder for placeholder-name of type select with three options', () => {
        const placeholder = placeholders[24];
        expect(placeholder.name).toBe('placeholder-name');
        expect(placeholder.dataType).toBe('select');
        expect(placeholder.options.length).toBe(3);
        expect(placeholder.options[0]).toBe('Yes');
        expect(placeholder.options[1]).toBe('No');
        expect(placeholder.options[2]).toBe('Maybe');
      });

    });

  });

  describe('create document', () => {

    [{
      templateText: 'Some text ${and-a-placeholder: string} and some more text ${and-another-placeholder: number}.',
      replacements: {
        'and-a-placeholder': 'here',
        'and-another-placeholder': 'over here'
      },
      result: 'Some text here and some more text over here.'
    }, {
      templateText: '${and-a-placeholder: string}${and-another-placeholder: number}',
      replacements: {
        'and-a-placeholder': 'here',
        'and-another-placeholder': 'over here'
      },
      result: 'hereover here'
    }].forEach(scenario => {

      let document: string;

      beforeEach(() => {
        document = service.hydrateTemplate(scenario.templateText, scenario.replacements);
      });

      it('should produce a document', () => {
        expect(document).toBeTruthy();
      });

      it('should produce correct output', () => {
        expect(document).toBe(scenario.result);
      });

    });

  });

});
