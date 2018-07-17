import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.scss']
})
export class ExpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  language: string;
  experience: string;
  _ref:any;

  removeObject(){
    this._ref.destroy();
  }
  save(){
    alert('Saved Successfully!');
  }
}
