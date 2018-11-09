import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./settings/profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {DummyComponent} from "./dummy/dummy.component";
import {SettingsComponent} from "./settings/settings.component";
import {ServiceprovidersComponent} from "./settings/serviceproviders/serviceproviders.component";
import {TemplatesComponent} from "./templates/templates.component";
import {EmailTemplatesComponent} from "./templates/email-templates/email-templates.component";
import {SmsTemplatesComponent} from "./templates/sms-templates/sms-templates.component";
import {SegmentCategoryComponent} from "./segment-category/segment-category.component";
import {FindUsersComponent} from "./segment-category/find-users/find-users.component";
import {SegmentsComponent} from "./segment-category/segments/segments.component";
import {ResetPwdComponent} from "./login/reset-pwd/reset-pwd.component";
import {TestComponent} from "./test/test.component";
import {CreateNewSegmentComponent} from "./segment-category/segments/create-new-segment/create-new-segment.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {SetupCampaignComponent} from "./campaigns/setup-campaign/setup-campaign.component";
import {CampaignsListComponent} from "./campaigns/campaigns-list/campaigns-list.component";
import {AccountSettingsComponent} from "./settings/account-settings/account-settings.component";
import {EmailListComponent} from "./settings/email-settings/email-list/email-list.component";
import {LandingPageUndComponent} from "./landing-page-und/landing-page-und.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {TermsOfServiceComponent} from "./terms-of-service/terms-of-service.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EmailSettingsComponent} from "./settings/email-settings/email-settings.component";
import {CreateEmailTemplateFormComponent} from "./templates/email-templates/create-email-template-form/create-email-template-form.component";
import {VerifyEmailComponent} from "./login/verify-email/verify-email.component";
// import {EventsGraphComponent} from "./graphs/events-graph/events-graph.component";
import {EventreportComponent} from "./eventreport/eventreport.component";
import {EventreportOverallComponent} from "./eventreport/eventreport-overall/eventreport-overall.component";
import {EventreportDemographicsComponent} from "./eventreport/eventreport-demographics/eventreport-demographics.component";
import {EventreportGeographicsComponent} from "./eventreport/eventreport-geographics/eventreport-geographics.component";
import {EventreportTechnographicsComponent} from "./eventreport/eventreport-technographics/eventreport-technographics.component";
import {EventreportReachabilityComponent} from "./eventreport/eventreport-reachability/eventreport-reachability.component";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";
import {CreateSmsTemplateFormComponent} from "./templates/sms-templates/create-sms-template-form/create-sms-template-form.component";
import {CreateReactiveSegmentComponent} from "./segment-category/segments/create-reactive-segment/create-reactive-segment.component";
import {SegmentReportComponent} from "./segment-report/segment-report.component";
import {FunnelReportFilter} from "./_models/reports";
import {FunnelComponent} from "./funnel/funnel.component";
import {CampaignReportComponent} from "./campaigns/campaign-report/campaign-report.component";
import {NotificationTemplatesAndroidComponent} from "./templates/notification-templates-android/notification-templates-android.component";
import {CreateNotificationTemplateAndroidFormComponent} from "./templates/notification-templates-android/create-notification-template-android-form/create-notification-template-android-form.component";
import {NotificationTemplatesWebPushComponent} from "./templates/notification-templates-web-push/notification-templates-web-push.component";
import {CreateNotificationTemplateWebPushFormComponent} from "./templates/notification-templates-web-push/create-notification-template-web-push-form/create-notification-template-web-push-form.component";

const routes: Routes = [
  //Pages without layout goes here
  {path: '', component: LandingPageUndComponent},

  // App Routes goes here
  {
    path: '', component: AppLayoutComponent,
    children: [
      {path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'reports/event', redirectTo: "reports/event/overall", pathMatch: "full", canActivate: [AuthGuard]},
      {
        path: 'reports/event', component: EventreportComponent, canActivate: [AuthGuard], children: [
        {path: 'overall', component: EventreportOverallComponent},
        {path: 'demographics', component: EventreportDemographicsComponent},
        {path: 'geographics', component: EventreportGeographicsComponent},
        {path: 'technographics', component: EventreportTechnographicsComponent},
        {path: 'reachability', component: EventreportReachabilityComponent}
      ]
      },
      {path: 'settings', redirectTo: "settings/profile", pathMatch: "full", canActivate: [AuthGuard]},
      {
        path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children: [
        {path: 'profile', component: ProfileComponent},
        {path: 'service-provider-settings', component: ServiceprovidersComponent},
        {path: 'account-settings', component: AccountSettingsComponent},
        {path: 'email-settings', component: EmailSettingsComponent, children: [
          {path: 'email-list', component: EmailListComponent}
        ]}
      ]
      },
      {path: 'segment', redirectTo: "segment/segments", canActivate: [AuthGuard], pathMatch: "full"},
      {
        path: 'segment', component: SegmentCategoryComponent, canActivate: [AuthGuard], children: [
        {path: 'find-users', component: FindUsersComponent},
        {path: 'create-new-segment', component: CreateNewSegmentComponent},
        {path: 'create-reactive-segment', component: CreateReactiveSegmentComponent},
        {path: 'segments', component: SegmentsComponent},
        {path: 'user-profile', component: UserProfileComponent}
      ]
      },
      {path:'reports/segment/:id', component:SegmentReportComponent, canActivate:[AuthGuard]},
      {path:'reports/funnel', component:FunnelComponent, canActivate:[AuthGuard]},
      {path:'reports/campaign', component:CampaignReportComponent, canActivate:[AuthGuard]},
      {path: 'create-email-template/:newTemplate', component: CreateEmailTemplateFormComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      {path: 'create-sms-template/:newTemplate', component: CreateSmsTemplateFormComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      {path: 'create-notification-template-android/:newTemplate', component: CreateNotificationTemplateAndroidFormComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      {path: 'create-notification-template-web-push/:newTemplate', component: CreateNotificationTemplateWebPushFormComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      {path: 'templates', redirectTo: "templates/email", canActivate: [AuthGuard], pathMatch: "full"},
      {
        path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard], children: [
        {path: 'email', component: EmailTemplatesComponent, pathMatch: 'full'},
        {path: 'sms', component: SmsTemplatesComponent},
        {path: 'notification-android', component: NotificationTemplatesAndroidComponent},
        {path: 'notification-web-push', component: NotificationTemplatesWebPushComponent}
      ]
      },
      {path: 'campaigns', component: CampaignsListComponent, canActivate: [AuthGuard], pathMatch: "full"},
      {
        path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard], children: [
        {path: 'sms', component: SetupCampaignComponent},
        {path: 'email', component: SetupCampaignComponent},
        {path: 'webpush', component: SetupCampaignComponent},
        {path: 'androidpush', component: SetupCampaignComponent}
      ]
      }
    ]
  },
  //Site Routes goes here
  {
    path: '', component: SiteLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'test', component: TestComponent},
      {path: 'home', redirectTo: ""},
      {path: 'register', component: RegisterComponent},
      {path: 'resetpwd/:code', component: ResetPwdComponent},
      {path: 'verifyemail/:email/:code', component: VerifyEmailComponent},
      {path: 'dummyJson', component: DummyComponent},
      {path: 'aboutus', component: AboutUsComponent},
      {path: 'terms-of-service', component: TermsOfServiceComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: '**', component: PageNotFoundComponent},
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

