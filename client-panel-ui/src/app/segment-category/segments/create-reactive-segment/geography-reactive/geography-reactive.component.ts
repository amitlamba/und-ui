import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {SegmentService} from "../../../../_services/segment.service";
import {City, Country, Geography, State} from "../../../../_models/segment";

@Component({
  selector: 'app-geography-reactive',
  templateUrl: './geography-reactive.component.html',
  styleUrls: ['./geography-reactive.component.scss']
})
export class GeographyReactiveComponent implements OnInit {

  // localGeographyFilter: Geography;
  // @Input() get geographyFilter(): Geography {
  //   return this.localGeographyFilter;
  // }
  // set geographyFilter(geographyFilter: Geography) {
  //   this.localGeographyFilter = geographyFilter;
  //   this.geographyFilterChange.emit(this.localGeographyFilter);
  // }
  //
  // @Output() geographyFilterChange = new EventEmitter();

  geographyFilter1:Geography;
  @Input() geographyForm: FormGroup;
  @Input() geographyFormIndex: number;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  selectedCountry: Country;
  selectedState: State;
  selectedCity: City;
  countries: Country[];
  states: State[];
  cities: City[];
  countriesSelectList: any[] = [];
  statesSelectList: any[] = [];
  citiesSelectList: any[] = [];

  select2Options: Select2Options = {};

  constructor(private segmentService: SegmentService) {
    this.countries = segmentService.countries;
    this.countriesSelectList.push({id: -1, text: "--Select--"});
    this.countries.forEach((country) => {
      this.countriesSelectList.push({id: country.id, text: country.name})
    });
    // this.select2Options.placeholder="--Select--";
    this.geographyFilter1=new Geography();
    this.geographyFilter1.country=new Country();
    this.geographyFilter1.state=new State();
    this.geographyFilter1.city=new City();
  }

  ngOnInit() {
    this.geographyForm.valueChanges.subscribe(data=>console.log(data));
  }

  getStates(countryId: number) {
    this.segmentService.getStates(countryId).subscribe(
      states => {
        this.states = states;
      }
    );
  }

  getCities(stateId: number) {
    this.segmentService.getStates(stateId).subscribe(
      cities => {
        this.cities = cities;
      }
    );
  }

  onCountrySelect(data: any) {
    console.log(data);
    console.log(data['data'][0]);
    this.geographyFilter1.country = new Country();
    this.geographyFilter1.country.id = data.value;
    this.geographyFilter1.country.name = data['data'][0].text;
    if (data.value > 0)
      this.segmentService.getStates(data.value).subscribe(
        states => {
          this.statesSelectList = [];
          this.statesSelectList.push({id: -1, text: "--Select--"});
          states.forEach(state => {
            this.statesSelectList.push({id: state.id, text: state.name})
          });
          this.selectedCountry = {id: data.value, name: data['data'][0].text};
          this.geographyForm.get('country').setValue(this.selectedCountry);
          this.selectedState = null;
          this.selectedCity = null;
        });
    else {
      this.selectedCountry = null;
      this.selectedState = null;
      this.selectedCity = null;
    }

  }

  onStateSelect(data: any) {
    console.log(data);
    this.geographyFilter1.state = new State();
    this.geographyFilter1.state.id = data.value;
    this.geographyFilter1.state.name = data['data'][0].text;
    if (data.value > 0)
      this.segmentService.getCities(data.value).subscribe(
        cities => {
          this.citiesSelectList = [];
          this.citiesSelectList.push({id: -1, text: "--Select--"});
          cities.forEach(city => {
            this.citiesSelectList.push({id: city.id, text: city.name})
          });
          this.selectedState = {id: data.value, name: data['data'][0].text};
          this.geographyForm.get('state').setValue(this.selectedState);
          this.selectedCity = null;
        });
    else {
      this.selectedState = null;
      this.selectedCity = null;
    }

  }

  onCitySelect(data: any) {
    console.log(data);
    this.geographyFilter1.city = new City();
    this.geographyFilter1.city.id = data.value;
    this.geographyFilter1.city.name = data['data'][0].text;
    if (data.value > 0)
      this.selectedCity = {id: data.value, name: data['data'][0].text};
    else
      this.selectedCity = null;

    this.geographyForm.get('city').setValue(this.selectedCity);

    console.log(this.geographyForm);
  }

  removeMe() {
    this.remove.emit(this.geographyFormIndex);
  }

}
