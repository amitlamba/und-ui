import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getEventData(Element): void {
    Element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  campaignData(data) : void {
    data.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
  segmentData(e) : void {
    e.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
