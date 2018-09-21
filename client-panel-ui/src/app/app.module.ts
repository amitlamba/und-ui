import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//used to create fake backend
import {MockBackend} from '@angular/http/testing';

import {AppComponent} from './app.component';

import {DummyComponent} from './dummy/dummy.component';
import {HttpClientModule} from '@angular/common/http';
import {ProfileComponent} from './settings/profile/profile.component';
import {UsersComponent} from './users/users.component';
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header/header.component";
import {RegisterComponent} from "./register/register.component";
import {InterceptorModule} from "./_interceptors/interceptor.module";
import {FooterComponent} from './footer/footer.component';
import {ServiceprovidersComponent} from './settings/serviceproviders/serviceproviders.component';
import {LogoutHeaderComponent} from './header/logout-header.component';
import {AppRoutingModule} from './app-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from "./_services/message.service";
import {TemplatesComponent} from './templates/templates.component';
import {SmsTemplatesComponent} from './templates/sms-templates/sms-templates.component';
import {EmailTemplatesComponent} from './templates/email-templates/email-templates.component';
import {CreateEmailTemplateFormComponent} from './templates/email-templates/create-email-template-form/create-email-template-form.component';
import {TemplatesService} from "./_services/templates.service";
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {CreateSmsTemplateFormComponent} from './templates/sms-templates/create-sms-template-form/create-sms-template-form.component';
import {UndEditorComponent} from './und-editor/und-editor.component';
import {SimpleTinyComponent} from './_helpers/simple-tiny/simple-tiny.component';
import {CkEditorComponent} from './_helpers/ck-editor/ck-editor.component';
import {MentionModule} from "./_helpers/mention/mention.module";
import {SegmentCategoryComponent} from './segment-category/segment-category.component';
import {FindUsersComponent} from './segment-category/find-users/find-users.component';
import {SegmentsComponent} from './segment-category/segments/segments.component';
import {DidEventsComponent} from './segment-category/did-events/did-events.component';
import {ResetPwdComponent} from './login/reset-pwd/reset-pwd.component';
import {Daterangepicker} from "ng2-daterangepicker";
import {DidEventComponent} from './segment-category/did-events/did-event/did-event.component';
import {FilterComponent} from './segment-category/did-events/did-event/filter/filter.component';

import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {TestComponent} from './test/test.component';
import {ExpComponent} from './test/exp/exp.component';
import {SettingsService} from "./_services/settings.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SegmentService} from "./_services/segment.service";
import {GlobalFiltersComponent} from './segment-category/global-filters/global-filters.component';
import {DateComparatorComponent} from './segment-category/date-comparator/date-comparator.component';
import {GeographyFiltersComponent} from './segment-category/geography-filters/geography-filters.component';
import {StringComparatorComponent} from './segment-category/string-comparator/string-comparator.component';
import {NumberComparatorComponent} from './segment-category/number-comparator/number-comparator.component';
import {GlobalFilterComponent} from './segment-category/global-filters/global-filter/global-filter.component';
import {GeographyFilterComponent} from "./segment-category/geography-filters/geography-filter/geography-filter.component";
import {CreateNewSegmentComponent} from './segment-category/segments/create-new-segment/create-new-segment.component';
import {UsersByBehaviourComponent} from './segment-category/find-users/users-by-behaviour/users-by-behaviour.component';

import {CampaignsComponent} from './campaigns/campaigns.component';
import {SetupCampaignComponent} from './campaigns/setup-campaign/setup-campaign.component';
import {CampaignsListComponent} from './campaigns/campaigns-list/campaigns-list.component';
import {DateTimeComponent} from './campaigns/setup-campaign/date-time/date-time.component';
import {CronEditorModule} from "./cron-editor/cron-editor.module";
import {SegmentNlpComponent} from './segment-category/segment-nlp/segment-nlp.component';
import {DemoTinymceComponent} from "./_helpers/demo-tinymce/demo-tinymce.component";
import {CampaignService} from "./_services/campaign.service";
import {AccountSettingsComponent} from './settings/account-settings/account-settings.component';
import {TimezonePickerModule} from 'ng2-timezone-selector';
import {EmailListComponent} from './settings/email-settings/email-list/email-list.component';
import {LandingPageUndComponent} from './landing-page-und/landing-page-und.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {DemoFormComponent} from './demo-form/demo-form.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import {NgxIntlTelInputModule} from "./ngx-intl-tel-input/src";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {NewVsExistingUsersGraphComponent} from "./graphs/new-vs-existing-users-graph/new-vs-existing-users-graph.component";
import {ReCaptchaModule} from "angular2-recaptcha";
import {TimerangeComponent} from './segment-category/timerange/timerange.component';
import {ConversionEventsGraphComponent} from "./graphs/conversion-events-graph/conversion-events-graph.component";
import {EventsGraphComponent} from "./graphs/events-graph/events-graph.component";
import {ChartsModule} from "ng2-charts";
import {ReportsService} from "./_services/reports.service";
import {RegisterService} from "./_services/register.service";
import {KeysPipe, UserProfileComponent} from './user-profile/user-profile.component';
import {TooltipModule} from "ngx-bootstrap";
import {CampaignsInfoComponent} from './campaigns-info/campaigns-info.component';
import {Select2Module} from "ng2-select2";
import {BaseGraphComponent} from './graphs/base-graph/base-graph.component';
import {EventUserListComponent} from './segment-category/event-user-list/event-user-list.component';
import {InputTrimDirective} from "./_directives/input-trim.directive";
import { EmailSettingsComponent } from './settings/email-settings/email-settings.component';
import { OrderByPipe } from './_pipes/order-by.pipe';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { PrivacyPolicyComponent } from './terms-of-service/privacy-policy/privacy-policy.component';
import { DrawChartComponent } from './graphs/highcharts/draw-chart/draw-chart.component';
import { DrawSemidonutChartComponent } from './graphs/highcharts/draw-semidonut-chart/draw-semidonut-chart.component';
import { Draw24HrsChartComponent } from './graphs/highcharts/draw24-hrs-chart/draw24-hrs-chart.component';
import { DrawSimpleChartComponent } from './graphs/highcharts/draw-simple-chart/draw-simple-chart.component';
import { EventreportComponent } from './eventreport/eventreport.component';
import { DrawTableComponent } from './graphs/draw-table/draw-table.component';
import { EventreportOverallComponent } from './eventreport/eventreport-overall/eventreport-overall.component';
import { EventreportDemographicsComponent } from './eventreport/eventreport-demographics/eventreport-demographics.component';
import { EventreportGeographicsComponent } from './eventreport/eventreport-geographics/eventreport-geographics.component';
import { EventreportTechnographicsComponent } from './eventreport/eventreport-technographics/eventreport-technographics.component';
import { EventreportReachabilityComponent } from './eventreport/eventreport-reachability/eventreport-reachability.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { CreateReactiveSegmentComponent } from './segment-category/segments/create-reactive-segment/create-reactive-segment.component';
import { FilterReactiveComponent } from './segment-category/segments/create-reactive-segment/filter-reactive/filter-reactive.component';
import { GeographyReactiveComponent } from './segment-category/segments/create-reactive-segment/geography-reactive/geography-reactive.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InterceptorModule,
    AppRoutingModule,
    MentionModule,
    Daterangepicker,
    BrowserAnimationsModule,
    Select2Module,
    CronEditorModule,
    TimezonePickerModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    ReCaptchaModule,
    ChartsModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    DummyComponent,
    ProfileComponent,
    UsersComponent,
    FooterComponent,
    ServiceprovidersComponent,
    LogoutHeaderComponent,
    SettingsComponent,
    MessagesComponent,
    TemplatesComponent,
    SmsTemplatesComponent,
    EmailTemplatesComponent,
    CreateEmailTemplateFormComponent,
    CreateSmsTemplateFormComponent,
    ForgotPasswordComponent,
    UndEditorComponent,
    SimpleTinyComponent,
    CkEditorComponent,
    SegmentCategoryComponent,
    FindUsersComponent,
    SegmentsComponent,
    DidEventsComponent,
    ResetPwdComponent,
    DidEventComponent,
    FilterComponent,
    PageNotFoundComponent,
    TestComponent,
    ExpComponent,
    CampaignsComponent,
    SetupCampaignComponent,
    CampaignsListComponent,
    GlobalFiltersComponent,
    DateComparatorComponent,
    GeographyFiltersComponent,
    StringComparatorComponent,
    NumberComparatorComponent,
    GlobalFilterComponent,
    GeographyFilterComponent,
    CreateNewSegmentComponent,
    UsersByBehaviourComponent,
    DateTimeComponent,
    SegmentNlpComponent,
    DemoTinymceComponent,
    AccountSettingsComponent,
    EmailListComponent,
    LandingPageUndComponent,
    DemoFormComponent,
    AboutUsComponent,
    TermsOfServiceComponent,
    ContactUsComponent,
    NewVsExistingUsersGraphComponent,
    TimerangeComponent,
    ConversionEventsGraphComponent,
    EventsGraphComponent,
    UserProfileComponent,
    CampaignsInfoComponent,
    KeysPipe,
    BaseGraphComponent,
    EventUserListComponent,
    InputTrimDirective,
    EmailSettingsComponent,
    OrderByPipe,
    VerifyEmailComponent,
    PrivacyPolicyComponent,
    DrawChartComponent,
    DrawSemidonutChartComponent,
    Draw24HrsChartComponent,
    DrawSimpleChartComponent,
    EventreportComponent,
    DrawTableComponent,
    EventreportOverallComponent,
    EventreportDemographicsComponent,
    EventreportGeographicsComponent,
    EventreportTechnographicsComponent,
    EventreportReachabilityComponent,
    AppLayoutComponent,
    SiteLayoutComponent,
    CreateReactiveSegmentComponent,
    FilterReactiveComponent,
    GeographyReactiveComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    // fakeBackendProvider,
    MockBackend,
    // BaseRequestOptions
    MessageService,
    TemplatesService,
    SettingsService,
    SegmentService,
    CampaignService,
    ReportsService,
    RegisterService
  ],
  entryComponents: [
    DidEventComponent,
    ExpComponent,
    DateTimeComponent,
    FilterComponent,
    GeographyFilterComponent,
    GlobalFilterComponent,
    CreateEmailTemplateFormComponent,
    BaseGraphComponent
  ],
  exports: [TooltipModule],
  bootstrap: [AppComponent]
})

export class AppModule {
}
