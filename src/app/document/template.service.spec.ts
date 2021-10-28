import { TestBed } from '@angular/core/testing';

import { Placeholder, TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('extract placeholders for', () => {

    describe('when given a valid template', () => {

      const template = `
      This is some text for the test template named \${name}.  It is expected to have a number of
      \${placeholders: string}.  Some of which may be optional, as in \${this-one: number, optional}.
      \${valida-tion}
      \${valida_tion}
      \${Validation}
      \${validation}
      \${validation: string}
      \${validation: number}
      \${validation: phone-number}
      \${validation: currency}
      \${validation: date}
      \${validation: time}
      \${validation: date-time}
      \${pattern-to-match, break}
      \${pattern-to-match, keep}
      \${pattern-to-match, table[abc,asf]}
      \${pattern-to-match:string, break}
      \${pattern-to-match: string, keep}
      \${pattern-to-match: string, table[abc,asf]}
      \${pattern-to-match: string, break, table[asdf]}
      \${pattern-to-match: string, keep, table[abc,asf]}.
      \${pattern-to-match: string,  break,\tkeep}
      \${pattern-to-match: string, break, keep, table[asdf]}
      `;
      let placeholders: Array<Placeholder>;

      beforeEach(() => {
        placeholders = service.extractPlaceholdersFrom(template);
      });

      it('should return an array of placeholders', () => {
        expect(placeholders).toBeTruthy();
      });

      it('should return twenty four placeholders', () => {
        expect(placeholders.length).toBe(24);
      });

      it('should return placeholder for pattern-to-match with break option', () => {
        expect(placeholders[14].name).toBe('pattern-to-match');
        expect(placeholders[14].dataType).toBe('string');
        expect(placeholders[14].break).toBe(true);
        expect(placeholders[14].keep).toBe(false);
      });

      it('should return placeholder for pattern-to-match of type string with break and keep options', () => {
        expect(placeholders[22].name).toBe('pattern-to-match');
        expect(placeholders[22].dataType).toBe('string');
        expect(placeholders[22].break).toBe(true);
        expect(placeholders[22].keep).toBe(true);
      });

    });

  });

});
