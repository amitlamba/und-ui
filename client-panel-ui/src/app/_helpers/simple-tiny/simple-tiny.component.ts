import {
  AfterViewInit, Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {MentionDirective} from "../mention/mention.directive";
import {UserParams} from "../../_models/user";

declare var tinymce: any;

@Component({
  selector: 'app-simple-tiny',
  templateUrl: './simple-tiny.component.html',
  styleUrls: ['./simple-tiny.component.scss']
})
export class SimpleTinyComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private _zone: NgZone) { }

  ngOnInit() {
  }

  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();
  @ViewChild(MentionDirective) mention: MentionDirective;
  items = UserParams.params;
  htmlContent = '';
  editor;

  ngAfterViewInit() {
    tinymce.init({
      mode: 'exact',
      height: 100,
      theme: 'modern',
      branding: false,
      selector: '#' + this.elementId,
      plugins: ['advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      // skin_url: '../../assets/skins/lightgray',
      // setup: editor => {
      //   this.editor = editor;
      //   editor.on('keyup', () => {
      //     const content = editor.getContent();
      //     this.onEditorKeyup.emit(content);
      //   });
      // },
      elements: "tmce",
      setup: this.tinySetup.bind(this)
    });
  }

  tinySetup(ed) {
    let comp = this;
    let mention = this.mention;
    ed.on('keydown', function(e) {
      let frame = <any>window.frames[ed.iframeElement.id];
      let contentEditable = frame.contentDocument.getElementById('tinymce');
      comp._zone.run(() => {
        comp.mention.keyHandler(e, contentEditable);
      });
    });
    ed.on('init', function(args) {
      mention.setIframe(ed.iframeElement);
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
