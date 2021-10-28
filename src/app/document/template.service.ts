import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const dataTypeExpressions = [
  { name: 'string', expression: '(?:string)' },
  { name: 'number', expression: '(?:number)' },
  { name: 'phoneNumber', expression: '(?:phone-number)' },
  { name: 'currency', expression: '(?:currency)' },
  { name: 'date', expression: '(?:date)' },
  { name: 'time', expression: '(?:time)' },
  { name: 'dateTime', expression: '(?:date-time)' },
  { name: 'address', expression: '(?:address)' }
]
  .map(dataType => dataType.expression)
  .join('|');

const placeholderNameExpression = `([a-zA-Z\\-\\_]*)`;
const dataTypeExpression = `(?:\\:\\s*(${dataTypeExpressions}))?`;
const optionalExpression = '(?:\\,\\s*(optional))?';
const breakExpression = '(?:\\,\\s*(break))?';
const keepExpression = '(?:\\,\\s*(keep))?';
const tableExpression = '(?:\\,\\s*(table\\[.*?\\]))?';
const extractPlaceholderDefinitionExpression = `\\$\\{${placeholderNameExpression}${dataTypeExpression}${optionalExpression}${breakExpression}${keepExpression}${tableExpression}\\}`;

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  public templateFor(templateIdentifier: string): Observable<Template> {
    return of(<Template>{
      title: 'aslkdjfasd',
      text: 'vuianuiwesdafaaasdf'
    });
  }

  public extractPlaceholdersFrom(templateText: string): Array<Placeholder> {
    const regex = RegExp(extractPlaceholderDefinitionExpression, 'mg');

    const placeholders = new Array<Placeholder>();

    let result: RegExpExecArray | null;
    while (!!(result = regex.exec(templateText))) {
      const match = result[0];
      const name = result[1];
      const dataType = result[2];
      const optional = result[3];
      const hardBreak = result[4];
      const keep = result[5];
      const table = result[6];
      placeholders.push(<Placeholder>{
        name: name,
        dataType: !!dataType ? dataType : 'string',
        optional: optional === 'optional',
        break: hardBreak === 'break',
        keep: keep === 'keep',
        tableDefinition: null
      });
    };

    return placeholders;
  }

}

export interface Template {
  title: string;
  text: string;
}

export type PlaceholderDataType = 'string' | 'number' | 'phone-number' | 'currency' | 'date' | 'time' | 'date-time';

export interface SimplePlaceholder {
  name: string;
  dataType: PlaceholderDataType;
  optional: boolean;
}

export interface Placeholder extends SimplePlaceholder {
  break: boolean;
  keep: boolean;
  tableDefinition: TableDefinition | null;
}

export interface TableDefinition {
  columns: Array<SimplePlaceholder>;
  minimumRows: number;
  maximumRows: number;
}