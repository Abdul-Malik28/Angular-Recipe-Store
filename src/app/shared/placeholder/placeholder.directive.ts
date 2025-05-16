import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  public viewContainerRef = inject(ViewContainerRef);

  constructor() { }

}
