import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {

  }

  getData() {
    console.log("yahan");
    this.httpClient.get('https://userndot-a528b.firebaseio.com/code.json');
  }

}
