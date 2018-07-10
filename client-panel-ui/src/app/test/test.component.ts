import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ExpComponent} from "./exp/exp.component";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private _cfr: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  languages: string[] = ["Hindi", "English", "Arabic", "Sanskrit", "Mandarin"];
  experiences: string[] = ["1-2", "2-3", "4-6", "6-10", "10-15"];

  @ViewChild('parent', { read: ViewContainerRef })    container: ViewContainerRef;

  addComponent(){
    // check and resolve the component
    var comp = this._cfr.resolveComponentFactory(ExpComponent);
    // Create component inside container
    var expComponent = this.container.createComponent(comp);
    // see explanations
    expComponent.instance._ref = expComponent;
    expComponent.instance.language = this.languages[Math.floor(Math.random()*this.languages.length)];
    expComponent.instance.experience = this.experiences[Math.floor(Math.random()*this.experiences.length)];
  }
}
