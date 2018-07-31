import {Campaign} from "../_models/campaign";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../_settings/app-settings";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {EmailTemplate} from "../_models/email";

@Injectable()
export class CampaignService {

  campaigns: Campaign[] = [];
  campaignObjectForInfo = new BehaviorSubject<Campaign>(new Campaign());
  campaignObjectForInfoObservable = this.campaignObjectForInfo.asObservable();


  constructor(private httpClient: HttpClient) {
  }

  saveCampaign(campaign: Campaign): Observable<Campaign> {
    return this.httpClient.post<Campaign>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_SAVE, campaign);
  }

  getCampaignList(): Observable<Campaign[]> {
    return this.httpClient.get<Campaign[]>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_LIST);
  }

  pauseCampaign(campId): Observable<number> {
    return this.httpClient.patch<number>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_PAUSE + "/" + campId, "");
  }

  resumeCampaign(campId): Observable<number> {
    return this.httpClient.patch<number>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_RESUME + "/" + campId, "");
  }

  stopCampaign(campId): Observable<number> {
    return this.httpClient.patch<number>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_STOP + "/" + campId, "");
  }

  deleteCampaign(campId): Observable<number> {
    return this.httpClient.patch<number>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_DELETE + "/" + campId, "");
  }

  getCampaignError(id: number): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN_ERROR + "/" + id);
  }
}
