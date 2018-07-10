import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {City, Country, Geography, State} from "../../../_models/segment";
import {SegmentService} from "../../../_services/segment.service";
import {GeographyFiltersComponent} from "../geography-filters.component";

@Component({
  selector: 'app-geography-filter',
  templateUrl: './geography-filter.component.html',
  styleUrls: ['./geography-filter.component.scss']
})
export class GeographyFilterComponent implements OnInit {

  localGeographyFilter: Geography;
  @Input() get geographyFilter(): Geography {
    return this.localGeographyFilter;
  }
  set geographyFilter(geographyFilter: Geography) {
    this.localGeographyFilter = geographyFilter;
    this.geographyFilterChange.emit(this.localGeographyFilter);
  }
  @Output() geographyFilterChange = new EventEmitter();

  countries: Country[];
  states: State[];
  cities: City[];
  selectedCountry: Country;
  selectedState: State;
  selectedCity: City;

  countriesSelectList: any[] = [];
  statesSelectList: any[] = [];
  citiesSelectList: any[] = [];

  select2Options: Select2Options = {};

  _parentRef: GeographyFiltersComponent;
  _ref: any;

  removeObject() {
    this.removeFromParentArr();
    this._ref.destroy();
  }

  removeFromParentArr() {
    // Find the component
    const componentIndex = this._parentRef.components.indexOf(this._ref);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this._parentRef.components.splice(componentIndex, 1);
    }

    const index = this._parentRef.geographyFilters.indexOf(this.geographyFilter);
    if (index != -1) {
      this._parentRef.geographyFilters.splice(index, 1);
    }
  }

  constructor(private segmentService: SegmentService) {
    this.countries = segmentService.countries;
    this.countriesSelectList.push({id: -1, text: "--Select--"});
    this.countries.forEach((country) => {
      this.countriesSelectList.push({id: country.id, text: country.name})
    });
    // this.select2Options.placeholder="--Select--";
  }

  ngOnInit() {
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
    this.geographyFilter.country = new Country();
    this.geographyFilter.country.id = data.value;
    this.geographyFilter.country.name = data['data'][0].text;
    if (data.value > 0)
      this.segmentService.getStates(data.value).subscribe(
        states => {
          this.statesSelectList = [];
          this.statesSelectList.push({id: -1, text: "--Select--"});
          states.forEach(state => {
            this.statesSelectList.push({id: state.id, text: state.name})
          });
          this.selectedCountry = {id: data.value, name: data['data'][0].text};
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
    this.geographyFilter.state = new State();
    this.geographyFilter.state.id = data.value;
    this.geographyFilter.state.name = data['data'][0].text;
    if (data.value > 0)
      this.segmentService.getCities(data.value).subscribe(
        cities => {
          this.citiesSelectList = [];
          this.citiesSelectList.push({id: -1, text: "--Select--"});
          cities.forEach(city => {
            this.citiesSelectList.push({id: city.id, text: city.name})
          });
          this.selectedState = {id: data.value, name: data['data'][0].text};
          this.selectedCity = null;
        });
    else {
      this.selectedState = null;
      this.selectedCity = null;
    }
  }

  onCitySelect(data: any) {
    console.log(data);
    this.geographyFilter.city = new City();
    this.geographyFilter.city.id = data.value;
    this.geographyFilter.city.name = data['data'][0].text;
    if (data.value > 0)
      this.selectedCity = {id: data.value, name: data['data'][0].text};
    else
      this.selectedCity = null;
  }
}
