import {Component, OnInit} from '@angular/core';

import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  title: string = "Dashboard";
  // users: EventUser[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    // get users from secure api end point
    // this.userService.getUsers()
    //   .subscribe(users => {
    //     this.users = users;
    //   });

    // Sample Graph Using ChartJS

    // let json = JSON.parse('{"message":"","cod":"200","city_id":2643743,"calctime":0.0875,"cnt":3,"list":[{"main":{"temp":279.946,"temp_min":279.946,"temp_max":279.946,"pressure":1016.76,"sea_level":1024.45,"grnd_level":1016.76,"humidity":100},"wind":{"speed":4.59,"deg":163.001},"clouds":{"all":92},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"rain":{"3h":2.69},"dt":1485717216},{"main":{"temp":282.597,"temp_min":282.597,"temp_max":282.597,"pressure":1012.12,"sea_level":1019.71,"grnd_level":1012.12,"humidity":98},"wind":{"speed":4.04,"deg":226},"clouds":{"all":92},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"rain":{"3h":0.405},"dt":1485745061},{"main":{"temp":279.38,"pressure":1011,"humidity":93,"temp_min":278.15,"temp_max":280.15},"wind":{"speed":2.6,"deg":30},"clouds":{"all":90},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"},{"id":741,"main":"Fog","description":"fog","icon":"50d"}],"dt":1485768552}]}');
    // console.log(json);
    // console.log(json['list']);
    //
    // let temp_max = json['list'].map(json => json.main.temp_max);
    // let temp_min = json['list'].map(json => json.main.temp_min);
    // let alldates = json['list'].map(json => json.dt)
    // let weatherDates = []
    // alldates.forEach((res) => {
    //   let jsdate = new Date(res * 1000)
    //   weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
    // })

  }

}
