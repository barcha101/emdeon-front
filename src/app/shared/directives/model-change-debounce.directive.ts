import { Directive, Input, Output, EventEmitter, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { fromEvent } from 'rxjs';
import {map, debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[debounce]'
})
export class ModelChangeDebounceDirective {

  @Input() delay: number = 700;
  @Input() event: string = 'keyup';
  @Output() debouncedModelUpdate = new EventEmitter<any>();

  public subscription: any = null;

  constructor(
    private model: NgModel,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    const eventStream = fromEvent(this.elementRef.nativeElement, this.event).pipe(
          map(() => this.model.value),
          debounceTime(this.delay));
    this.subscription = eventStream.subscribe(input => this.debouncedModelUpdate.emit(input));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}