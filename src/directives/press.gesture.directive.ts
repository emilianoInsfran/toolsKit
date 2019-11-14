import {Directive, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';
declare var Hammer: any;

@Directive({
  selector: '[doubleTapp]'
})
export class PressDirective implements OnInit, OnDestroy {
  el: HTMLElement;
  pressGesture: Gesture;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    debugger;
    this.pressGesture = new Gesture(this.el, {
        recognizers: [
          [Hammer.Tap, {taps: 2}]
        ]
      });
    this.pressGesture.listen();
    this.pressGesture.on('tap', e => {
        alert();
    });
  }
  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}