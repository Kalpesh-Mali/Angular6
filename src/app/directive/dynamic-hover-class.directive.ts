import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dynamicHoverClass]'
})
export class DynamicHoverClassDirective {

  @Input() dynamicHoverClass: string;
  constructor(private elRef: ElementRef,
  private renderer: Renderer2) {
  }
  @HostListener('mouseover') onMouseOver() {
    this.addClass(this.dynamicHoverClass);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.removeClass(this.dynamicHoverClass);
  }
  private changeBackgroundColor(color: string) {
    this.elRef.nativeElement.style.backgroundColor = color;
  }  

  private  removeClass(className: string) {
      this.renderer.removeClass(this.elRef.nativeElement, className);
  }
  private  addClass(className: string) {
    this.renderer.addClass(this.elRef.nativeElement, className);
  }

}
