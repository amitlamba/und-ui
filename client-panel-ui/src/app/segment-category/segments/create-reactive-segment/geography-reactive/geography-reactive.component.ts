import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {SegmentService} from "../../../../_services/segment.service";
import {City, Country, Geography, State} from "../../../../_models/segment";

@Component({
  selector: 'app-geography-reactive',
  templateUrl: './geography-reactive.component.html',
  styleUrls: ['./geography-reactive.component.scss']
})
export class GeographyReactiveComponent implements OnInit ,OnChanges{

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
  private _states: State[];
  private _cities: City[];
  countriesSelectList: any[] = [];
  statesSelectList: any[] = [];
  citiesSelectList: any[] = [];

  select2Options: Select2Options = {};


  get states(): State[] {
    return this._states;
  }

  set states(value: State[]) {
    this._states = value;
    this._states.forEach(v=>{
            this.statesSelectList.push({id:v.id,text:v.name});
    });
  }

  get cities(): City[] {
    return this._cities;
  }

  set cities(value: City[]) {
    this._cities = value;
    this._cities.forEach(v=>{
      this.citiesSelectList.push({id:v.id,text:v.name});
    });
  }

  constructor(private segmentService: SegmentService) {
    this.countries = segmentService.countries;
    // this.countriesSelectList.push({id: -1, text: "--Select--"});
    // this.select2Options.placeholder="--Select--";

    this.geographyFilter1=new Geography();
    this.geographyFilter1.country=new Country();
    this.geographyFilter1.state=new State();
    this.geographyFilter1.city=new City();
  }

  ngOnInit() {
    this.geographyForm.valueChanges.subscribe(data=>console.log(data));

    if(!this.geographyForm.get('country').value) {
      this.countriesSelectList.push({id: -1, text: "Country"});
    }else{
      this.countriesSelectList.push({id:this.geographyForm.get('country').value['id'],text:this.geographyForm.get('country').value['name']});
      this.getStates(this.geographyForm.get('country').value['id']);
      // this.onCountrySelect()
    }
    if(this.geographyForm.get('state').value) {
      this.statesSelectList.push({id:this.geographyForm.get('state').value['id'],text:this.geographyForm.get('state').value['name']});
      this.getCities(this.geographyForm.get('state').value['id']);
    }
    if(this.geographyForm.get('city').value) {
      this.citiesSelectList.push({id:this.geographyForm.get('city').value['id'],text:this.geographyForm.get('city').value['name']});
      this.selectedCity=this.geographyForm.get('city').value;
    }

    this.countries.forEach((country) => {
      this.countriesSelectList.push({id: country.id, text: country.name})
    });
  }

  ngOnChanges(){
  }



  getStates(countryId: number) {
    this.segmentService.getStates(countryId).subscribe(
      states => {
        this._states = states;
        states.forEach(v=>{
          this.statesSelectList.push({id:v.id,text:v.name});
        })
        this.selectedCountry=this.geographyForm.get('country').value;
      }
    );
  }

  getCities(stateId: number) {
    this.segmentService.getCities(stateId).subscribe(
      cities => {
        this._cities = cities;
        cities.forEach(v=>{
          this.citiesSelectList.push({id:v.id,text:v.name});
        })
        this.selectedState=this.geographyForm.get('state').value;

      }
    );
  }

  onCountrySelect(data: any) {
    console.log(data);
    console.log(data['data'][0]);

    this.geographyFilter1.country.id = data.value;
    this.geographyFilter1.country.name = data['data'][0].text;
    if (data.value > 0)
      this.segmentService.getStates(data.value).subscribe(
        states => {
          this.statesSelectList = [];
          this.statesSelectList.push({id: -1, text: "State"});
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

    this.geographyFilter1.state.id = data.value;
    this.geographyFilter1.state.name = data['data'][0].text;
    if (data.value > 0)
      this.segmentService.getCities(data.value).subscribe(
        cities => {
          this.citiesSelectList = [];
          this.citiesSelectList.push({id: -1, text: "City"});
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
