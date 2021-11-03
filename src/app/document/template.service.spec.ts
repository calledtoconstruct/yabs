import { Placeholder, TemplateService } from './template.service';
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
      \${placeholder-name: select[Yes|No|Maybe]}
      `;
      let placeholders: Array<Placeholder>;

      beforeEach(() => {
        placeholders = service.extractPlaceholdersFrom(template);
      });

      it('should return an array of placeholders', () => {
        expect(placeholders).toBeTruthy();
      });

      it('should return twenty four placeholders', () => {
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

});
