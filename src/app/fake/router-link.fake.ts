import { Directive, HostListener, Input } from '@angular/core';

type NavigationParameters = Array<string | number | { [key: string]: string | number }> | null;

@Directive({
  selector: '[routerLink]'
})
export class FakeRouterLinkDirective {

  @Input() public routerLink: NavigationParameters = null;

  public navigatedTo: NavigationParameters = null;

  @HostListener('click')
  public onClick(): void {
    this.navigatedTo = this.routerLink;
  }
}