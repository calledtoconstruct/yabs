import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[src]'
})
export class FakeImageDirective implements OnInit {
    
  private readonly imageElement: HTMLImageElement = this.elementReference.nativeElement;

  @Input() public src = '';

  constructor(
    private readonly elementReference: ElementRef
  ) {
  }

  public ngOnInit(): void {
    this.imageElement.src = '/favicon.ico';
  }

}