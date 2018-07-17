import {
  Component, ElementRef, NgZone, Input, ViewChild, EventEmitter, Output, OnDestroy,
  AfterViewInit
} from '@angular/core';
import {MentionDirective} from "../mention/mention.directive";
import {UserParams} from "../../_models/user";


declare var tinymce: any;

/**
 * Angular 2 Mentions.
 * https://github.com/dmacfarlane/angular-mentions
 *
 * Example usage with TinyMCE.
 */
@Component({
  selector: 'app-demo-tinymce',
  template: `
    <div class="form-group" style="position:relative">
      <div [mention]="items"></div>
      <div>
        <textarea class="hidden" cols="60" rows="4" id="tmce" >{{htmlContent}}
        </textarea>
        <button class="btn btn-primary my-3" (click)="addUnsubscribeLink($event)" type="button">{{unsubscribeButtonText}}</button>
      </div>
    </div>`
})
export class DemoTinymceComponent implements OnDestroy, AfterViewInit{
  @ViewChild('tmce') tmce: ElementRef;

  unsubscribeButtonText = "Add Unsubscribe";

  localHtmlContent: string = "Text";
  @Input() get htmlContent(): string {
    return this.localHtmlContent;
  };
  set htmlContent(htmlContent: string) {
    this.localHtmlContent = htmlContent;
    this.htmlContentChange.emit(this.localHtmlContent);
  }
  @Output() htmlContentChange = new EventEmitter();

  @ViewChild(MentionDirective) mention: MentionDirective;
  public items: string[] = UserParams.params;

  constructor(private _elementRef: ElementRef, private _zone: NgZone) {
  }

  ngOnDestroy() {
    tinymce.remove();
  }

  ngAfterViewInit() {
    console.log(this.htmlContent);
    if (this.htmlContent && this.htmlContent.indexOf('##UND_UNSUBSCRIBE_LINK##') >= 0) {
      this.unsubscribeButtonText = "Remove Unsubscribe";
    } else {
      this.unsubscribeButtonText = "Add Unsubscribe";
    }
    tinymce.init({
      mode: 'exact',
      height: 100,
      theme: 'modern',
      branding: false,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      elements: "tmce",
      setup: this.tinySetup.bind(this),
    });
  }

  tinySetup(ed) {
    console.log(this.htmlContent);
    let comp = this;
    let mention = this.mention;
    ed.on('keydown', function (e) {
      let frame = <any>window.frames[ed.iframeElement.id];
      let contentEditable = frame.contentDocument.getElementById('tinymce');
      comp._zone.run(() => {
        comp.mention.keyHandler(e, contentEditable);
      });
    });
    ed.on('init', (e) => {
      mention.setIframe(ed.iframeElement);
      // this.htmlContent = e.target.innerHTML;
      e.target.innerHTML = this.localHtmlContent;
      console.log(this.localHtmlContent);
    });
    ed.on('keyup', (e) => {
      let frame = <any>window.frames[ed.iframeElement.id];
      this.htmlContent = e.target.innerHTML;
      console.log(this.localHtmlContent);
    });

  }
  addUnsubscribeLink(event) {
    console.log(this.htmlContent);

    if(this.htmlContent && this.htmlContent.indexOf('##UND_UNSUBSCRIBE_LINK##') >= 0){
      // http://archive.tinymce.com/wiki.php/API3:method.tinymce.dom.DOMUtils.add  "Below Line Definition."\

      tinymce.activeEditor.dom.remove(tinymce.activeEditor.dom.select('#unsubscribe'));
      this.htmlContent = tinymce.activeEditor.getBody().innerHTML;
      event.srcElement.innerHTML='Add Unsubscribe';
    }
    else {
      tinymce.activeEditor.dom.add(tinymce.activeEditor.getBody(), 'a', {href : '##UND_UNSUBSCRIBE_LINK##' ,id : 'unsubscribe'} , 'Unsubscribe');
      this.htmlContent = tinymce.activeEditor.getBody().innerHTML;
      event.srcElement.innerHTML='Remove Unsubscribe';
    }
    // console.log(this.htmlContent);
  }
}
