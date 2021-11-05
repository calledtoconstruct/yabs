import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

const dataTypeExpressions = [
  { name: 'string', expression: '(?:string)' },
  { name: 'number', expression: '(?:number)' },
  { name: 'phoneNumber', expression: '(?:phone-number)' },
  { name: 'currency', expression: '(?:currency)' },
  { name: 'date', expression: '(?:date)' },
  { name: 'time', expression: '(?:time)' },
  { name: 'dateTime', expression: '(?:date-time)' },
  { name: 'address', expression: '(?:address)' },
  { name: 'select', expression: '(?:select\\[[a-zA-Z0-9, |]*\\])' }
]
  .map(dataType => dataType.expression)
  .join('|');

const placeholderNameExpression = '([a-zA-Z\\-\\_]*)';
const dataTypeExpression = `(?:\\:\\s*(${dataTypeExpressions}))?`;
const optionalExpression = '(?:\\,\\s*(optional))?';
const breakExpression = '(?:\\,\\s*(break))?';
const keepExpression = '(?:\\,\\s*(keep))?';
const tableExpression = '(?:\\,\\s*(table\\[.*?\\]))?';
const extractPlaceholderDefinitionExpression = `\\$\\{${placeholderNameExpression}${dataTypeExpression}${optionalExpression}${breakExpression}${keepExpression}${tableExpression}\\}`;
const optionExpression = '[a-zA-Z0-9, ]*';
const selectExpression = `^select\\[(${optionExpression}(?:\\|${optionExpression})*)\\]$`;

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  public templateFor(_templateIdentifier: string): Observable<Template> {
    return of(<Template>{
      title: 'aslkdjfasd',
      text: '${sdfdfas: string}, ${fjksdsdf: number, optional, break}, ${sdf-asa: string, keep}, ${select-with-options: select[|Yes|No|Maybe]}'
    });
  }

  private extractOptionsFrom(select: string): Array<string> {
    const selectRegex = RegExp(selectExpression, 'mg');

    const options = new Array<string>();

    let result: RegExpExecArray | null;

    while ((result = selectRegex.exec(select))) {
      const _match = result[0];
      const optionsString = result[1];
      optionsString.split('|').forEach(option => options.push(option));
    }

    return options;
  }

  public extractPlaceholdersFrom(templateText: string): Array<Placeholder> {
    const regex = RegExp(extractPlaceholderDefinitionExpression, 'mg');

    const placeholders = new Array<Placeholder>();

    let result: RegExpExecArray | null;

    while ((result = regex.exec(templateText))) {
      const _match = result[0];
      const name = result[1];
      let dataType = result[2];
      const optional = result[3];
      const hardBreak = result[4];
      const keep = result[5];
      const _table = result[6];
      const options = this.extractOptionsFrom(dataType);
      if (options.length > 0) dataType = 'select';
      placeholders.push(<Placeholder>{
        name: name,
        dataType: dataType ? dataType : 'string',
        optional: optional === 'optional',
        break: hardBreak === 'break',
        keep: keep === 'keep',
        tableDefinition: null,
        options: options
      });
    }

    return placeholders;
  }

  public createDocument(templateText: string, replacements: { [key: string]: string }): string {
    const regex = RegExp(extractPlaceholderDefinitionExpression, 'mg');

    const segments = new Array<string>();

    let fromPosition = 0;
    let result: RegExpExecArray | null;

    while ((result = regex.exec(templateText))) {
      
      const startPosition = result.index;
      const match = result[0];
      const endPosition = startPosition + match.length;

      const name = result[1];

      if (startPosition > fromPosition) {
        segments.push(templateText.substr(fromPosition, startPosition - fromPosition));
      }

      segments.push(replacements[name]);

      fromPosition = endPosition;
    }

    if (templateText.length > fromPosition) {
      segments.push(templateText.substr(fromPosition, templateText.length - fromPosition));
    }

    return segments.join('');
  }

}

export interface Template {
  title: string;
  text: string;
}

export type PlaceholderDataType = 'string' | 'number' | 'phone-number' | 'currency' | 'date' | 'time' | 'date-time' | 'select';

export interface SimplePlaceholder {
  name: string;
  dataType: PlaceholderDataType;
  optional: boolean;
}

export interface Placeholder extends SimplePlaceholder {
  break: boolean;
  keep: boolean;
  tableDefinition: TableDefinition | null;
  options: Array<string>;
}

export interface TableDefinition {
  columns: Array<SimplePlaceholder>;
  minimumRows: number;
  maximumRows: number;
}