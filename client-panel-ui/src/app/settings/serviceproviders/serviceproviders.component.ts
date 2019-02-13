import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceProviderCredentials, ServiceProviderType} from "../../_models/client";
import {MessageService} from "../../_services/message.service";
import {AuthenticationService} from "../../_services/authentication.service";
import {SettingsService} from "../../_services/settings.service";
import {Router} from "@angular/router";
import {parseHttpResponse} from "selenium-webdriver/http";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile-serviceproviders',
  templateUrl: './serviceproviders.component.html',
  styleUrls: ['./serviceproviders.component.scss']
})
export class ServiceprovidersComponent implements OnInit {

  @ViewChild("f") form: any;
  serviceProviderCredentials: ServiceProviderCredentials = new ServiceProviderCredentials();
  serviceProviderTypes: string[];
  serviceProviders: string[] = [];
  serviceProviderFields: any = {};
  serviceProviderCredentialsList: ServiceProviderCredentials[] = [];
  // showServiceProviderView: boolean = false;
  serviceProviderViewData: ServiceProviderCredentials;

  constructor(private messageService: MessageService,
              private authenticationService: AuthenticationService,
              public settingsService: SettingsService,
              private router: Router) {
    this.initServiceProviderTypes();
  }

  ngOnInit() {
    // if(!this.settingsService.serviceProviderListLoaded) {
    //   this.getServiceProvidersList();
    //   this.settingsService.serviceProviderListLoaded = true;
    // }
    this.getServiceProvidersList();
    //   this.settingsService.serviceProviderListLoaded = true;
  }

  initServiceProviderTypes() {
    this.setServiceProviderTypes();
  }

  setServiceProviderTypes() {
    let spTypes = Object.keys(this.settingsService.serviceProviders);
    this.serviceProviderTypes = spTypes;
  }

  setServiceProviders(serviceProviderType: string) {
    let sp = Object.keys(this.settingsService.serviceProviders[serviceProviderType]['providers']);
    this.serviceProviderCredentials.serviceProvider = sp[0];
    this.setServiceProviderFields();
    this.serviceProviders = sp;
    // this.serviceProviderCredentials.credentialsMap = {};
  }

  onChangeServiceProviderType(data: string) {
    this.serviceProviderCredentials.serviceProviderType = data;
    console.log(this.serviceProviderCredentials.serviceProviderType);
    this.setServiceProviders(this.serviceProviderCredentials.serviceProviderType);
  }

  onChangeServiceProvider() {
    this.setServiceProviderFields();
  }

  setServiceProviderFields() {
    let f = this.settingsService.serviceProviders[this.serviceProviderCredentials.serviceProviderType]['providers'][this.serviceProviderCredentials.serviceProvider]["fields"];
    this.serviceProviderFields = f;
    let cmap:any={};
    this.serviceProviderFields.forEach((v)=>{
      if(v.fieldType=="select") cmap[v.fieldName]=v.defaultOption;
    });
    this.serviceProviderCredentials.name="";
    this.serviceProviderCredentials.credentialsMap = cmap;
  }

  getServiceProvidersList() {
    this.settingsService.getServiceProvidersList().subscribe(
      (serviceProviderCredentialsList) => {
        this.serviceProviderCredentialsList = serviceProviderCredentialsList;
      }
    );
  }

  onSave(form: FormData) {
    if (this.form.valid) {
      if (this.serviceProviderCredentials.serviceProviderType === 'Email Service Provider') {
        console.log(JSON.stringify(this.serviceProviderCredentials));
        this.settingsService.saveServiceProviderCredentialEmail(this.serviceProviderCredentials).subscribe(
          (id) => {
            console.log("serviceProviderCredentials:"+id);
            // this.settingsService.serviceProvidersList.push(serviceProviderCredentials);
            this.getServiceProvidersList();
          },
          error =>{
            this.messageService.addDangerMessage(error.error.error)
          }
        );

      }
      if (this.serviceProviderCredentials.serviceProviderType === 'SMS Service Provider') {
        this.settingsService.saveServiceProviderCredentialsSms(this.serviceProviderCredentials).subscribe(
          (id) => {
            console.log("serviceProviderCredentials:"+id);
            // this.settingsService.serviceProvidersList.push(serviceProviderCredentials);
            this.getServiceProvidersList();
          },
          error =>{
            this.messageService.addDangerMessage(error.error.error)
          }
        );
      }
      if (this.serviceProviderCredentials.serviceProviderType === 'Notification Service Provider') {
        this.settingsService.saveServiceProviderCredentialsNotification(this.serviceProviderCredentials).subscribe(
          (id) => {
            console.log("serviceProviderCredentials:"+id);
            // this.settingsService.serviceProvidersList.push(serviceProviderCredentials);
            this.getServiceProvidersList();
          }
        );
      }
      if (this.serviceProviderCredentials.serviceProviderType === 'Android Push Service Provider') {
        this.settingsService.saveServiceProviderCredentialsAndroidPush(this.serviceProviderCredentials).subscribe(
          (id) => {
            console.log("serviceProviderCredentials:"+id);
            // this.settingsService.serviceProvidersList.push(serviceProviderCredentials);
            this.getServiceProvidersList();
          },
          error =>{
            this.messageService.addDangerMessage(error.error.error)
          }
        );
      }
      if (this.serviceProviderCredentials.serviceProviderType === 'Web Push Service Provider') {
        this.settingsService.saveServiceProviderCredentialsWebPush(this.serviceProviderCredentials).subscribe(
          (id) => {
            console.log("serviceProviderCredentials:"+id);
            // this.settingsService.serviceProvidersList.push(serviceProviderCredentials);
            this.getServiceProvidersList();
          },
          error =>{
            this.messageService.addDangerMessage(error.error.error)
          }
        );
      }
      if (this.serviceProviderCredentials.serviceProviderType === 'iOS Push Service Provider') {
        this.settingsService.saveServiceProviderCredentialsIOSPush(this.serviceProviderCredentials).subscribe(
          (id) => {
            console.log("serviceProviderCredentials:"+id);
            // this.settingsService.serviceProvidersList.push(serviceProviderCredentials);
            this.getServiceProvidersList();
          },
          error =>{
            this.messageService.addDangerMessage(error.error.error)
          }
        );
      }
    }

  }

  markAsDefault(serviceProviderCredential: ServiceProviderCredentials) {
    this.settingsService.setDefaultServiceProvider(serviceProviderCredential.serviceProviderType, serviceProviderCredential.id)
      .subscribe((response) => {
          this.messageService.addSuccessMessage("Service Provider Marked as Default successfully.");
          this.getServiceProvidersList();
      },
        (error: HttpErrorResponse) => {
          this.messageService.addDangerMessage(error.error.message);
        })
  }

  viewServiceProvider(spc: ServiceProviderCredentials) {
    this.serviceProviderViewData = spc;
    // this.showServiceProviderView = true;
  }

  get credentialsArray(): Array<Array<string>> {
    let keys = Object.keys(this.serviceProviderViewData.credentialsMap);
    return keys.map<Array<string>>((v)=>{return [v, this.serviceProviderViewData.credentialsMap[v]]});
  }
}
