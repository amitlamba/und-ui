// Inspired from https://github.com/HstarComponents/ngx-ckeditor
import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {UserParams} from "../../_models/user";
import {MentionDirective} from "../mention/mention.directive";

declare var CKEDITOR: any;

const defaults = {
  contentsCss: [''],
  customConfig: ''
};

export const CKEDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CkEditorComponent),
  multi: true
};

@Component({
  selector: 'ck-editor',
  template: `<textarea #ck
                       [mention]="suggestedList"
                       [mentionConfig]="{triggerChar:'$',maxItems:10,labelKey:'name'}"
                       contenteditable="true"></textarea>`,
  providers: [CKEDITOR_VALUE_ACCESSOR]
})
export class CkEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
  suggestedList:string[]=["laksh","kamal","a","b","c"];
  items = UserParams.params;

  @ViewChild(MentionDirective) mention: MentionDirective;

  private ckIns: any;

  private onChange(_: any) {
    console.log("onChangeCalled: " + _);
  };

  private onTouched() {
  };

  private innerValue: string = '';

  @Input()
  public readonly: boolean = false;

  @Input()
  public config: any = {};

  @Input()
  public skin: string = 'moono-lisa';

  @Input()
  public language: string = 'en';

  @Input()
  public fullPage: boolean = false;

  @ViewChild('ck')
  public ck: ElementRef;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this.config.toolbar = [
      [ 'Source', '-', 'Bold', 'Italic' ]
    ];
    this.// This is actually the default value for it.
      config.fontSize_style = {
      element:        'span',
      styles:         { 'font-size': '#(size)' },
      overrides:      [ { element: 'font', attributes: { 'size': null } } ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ckIns) {
      return;
    }
    if (changes.readonly) {
      this.ckIns.setReadOnly(this.readonly);
    }
  }

  ngOnDestroy() {
    if (this.ckIns) {
      this.ckIns.removeAllListeners();
      CKEDITOR.instances[this.ckIns.name].destroy();
      this.ckIns.destroy();
      this.ckIns = null;
    }
  }

  ngAfterViewInit() {
    this.initCKEditor();
  }

  private initCKEditor() {
    if (typeof CKEDITOR === 'undefined') {
      return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }
    let opt = Object.assign({}, defaults, this.config, {
      readOnly: this.readonly,
      skin: this.skin,
      language: this.language,
      fullPage: this.fullPage
    });
    this.ckIns = CKEDITOR.replace(this.ck.nativeElement, opt);
    this.ckIns.setData(this.innerValue);
    this.ckIns.on('keydown', (e) => {
      console.warn("keydown" + e);
      // this.mention.keyHandler(e, this.innerValue);
    });
    this.ckIns.on('change', () => {
      this.onTouched();
      let val = this.ckIns.getData();
      console.warn('chagne', val);
      this.updateValue(val);
    });
  }

  private updateValue(value: string) {
    this.ngZone.run(() => {
      this.innerValue = value;
      this.onChange(value); // Notify external ngModel update
      this.onTouched();
    });
  }

  writeValue(value: any): void {
    console.log(value);
    this.innerValue = value || '';
    if (this.ckIns) {
      this.ckIns.setData(this.innerValue);
      // Fix FullPage mode, when set consecutively two times without the html tag value, does not trigger the change event, resulting in ngModel can not be updated bug。
      let val = this.ckIns.getData();
      this.ckIns.setData(val);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

}
