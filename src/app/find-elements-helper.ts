import { DebugElement } from '@angular/core';

export class FindElementToken {

  private readonly tests = new Array<(element: DebugElement) => boolean>();
  private readonly alternatives = new Array<(element: DebugElement) => boolean>();

  constructor(
    tagName?: string
  ) {
    if (tagName) {
      this.tests.push(element => element.name === tagName);
    }
  }

  public or(tagName: string): FindElementToken {
    this.rollup();
    this.tests.push(element => element.name === tagName);
    return this;
  }

  public withClass(className: string): FindElementToken {
    this.tests.push(element => element.classes[className]);
    return this;
  }

  public withAttribute(attributeName: string): FindElementToken {
    this.tests.push(element => Object.keys(element.attributes).includes(attributeName));
    return this;
  }

  public withAttributeValue(attributeName: string, attributeValue: string): FindElementToken {
    this.tests.push(element => !!element.attributes[attributeName] && element.attributes[attributeName] === attributeValue);
    return this;
  }

  public withInnerText(innerText: string): FindElementToken {
    this.tests.push(element => element.nativeElement.innerText === innerText);
    return this;
  }

  public withOneChild(apply: (child: FindElementToken) => FindElementToken): FindElementToken {
    this.tests.push(element => element.children.length !== 1);
    this.tests.push(element => apply(new FindElementToken()).please()(element.children[0]));
    return this;
  }

  private rollup(): void {
    const tests = this.tests.splice(0, this.tests.length);
    const test = (element: DebugElement): boolean => tests.reduce(
      (isPassing: boolean, test: (element: DebugElement) => boolean): boolean => isPassing && test(element),
      true
    );
    this.alternatives.push(test);
  }

  public please(): (element: DebugElement) => boolean {
    this.rollup();
    return element => this.alternatives.reduce(
      (previous: boolean, test: (element: DebugElement) => boolean) => previous || test(element),
      false
    );
  }

}

export const findElement = (tagName: string): FindElementToken => {
  return new FindElementToken(tagName);
};

export const findOneOf = (apply: (element: FindElementToken, tagName?: string) => FindElementToken, tagName: string, ...tagNames: Array<string>): FindElementToken => {
  return tagNames.reduce(
    (token, tagName) => apply(token.or(tagName), tagName),
    apply(findElement(tagName), tagName)
  );
};