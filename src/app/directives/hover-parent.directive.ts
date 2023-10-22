import {Directive, ElementRef, HostListener, inject, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Directive({
  selector: '[appHoverParent]'
})
export class HoverParentDirective implements OnInit {
  @Input() appHoverParent!: [parentElement: HTMLElement, ...classes: string[]];
  private renderer = inject(Renderer2)
  private elementRef = inject(ElementRef)

  constructor() {
  }

  ngOnInit(): void {
    const [parentElement, ...classes] = this.appHoverParent;
    this.renderer.listen(parentElement, 'mouseenter', () => {
      classes.forEach((className) => {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      })
    })
    this.renderer.listen(parentElement, 'mouseleave', () => {
      classes.forEach((className) => {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      })
    })
  }


}
