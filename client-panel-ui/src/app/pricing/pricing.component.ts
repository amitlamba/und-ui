import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  price:string="this is from pricing page";

  constructor() {
  }

  ngOnInit() {

  }

  ContactForm(Element): void {
    Element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
