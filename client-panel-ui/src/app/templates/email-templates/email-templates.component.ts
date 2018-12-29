import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EditorSelected, EmailTemplate} from "../../_models/email";
import {TemplatesService} from "../../_services/templates.service";
import {CreateEmailTemplateFormComponent} from "./create-email-template-form/create-email-template-form.component";
import {Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {

  emailTemplates = new Array<EmailTemplate>();

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];
  state: RouterStateSnapshot;

  searchFilteredEmailTemplates: EmailTemplate[];

  private _searchfilterby: string;
  get searchfilterby(): string {
    return this._searchfilterby;
  }

  set searchfilterby(value: string) {
    this._searchfilterby = value;
    if (!value)
      this.searchFilteredEmailTemplates = this.emailTemplates;
    else
      this.searchFilteredEmailTemplates = this.emailTemplates.filter((v, i, a) => {
        return v.name.toLowerCase().indexOf(this._searchfilterby.toLowerCase()) > -1
      });
  }

  constructor(
    public templatesService: TemplatesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) {
    this.state = router.routerState.snapshot;
  }

  ngOnInit() {
    this.templatesService.castEmailTemplates.subscribe(
      (emailTemplates) => {
        this.searchFilteredEmailTemplates = this.emailTemplates = emailTemplates;
        console.log(this.emailTemplates);
      }
    );
    this.getEmailTemplates();
  }

  getEmailTemplates() {
    this.templatesService.getEmailTemplates().subscribe(
      (response) => {
        // this.emailTemplates = response;
        this.templatesService.addEmailTemplates(response);
      }
    );
  }

  onClone(emailTemplate: EmailTemplate) {
    this.removeComponent();
    console.log(JSON.parse(JSON.stringify(emailTemplate)));
    this.templatesService.emailTemplateForEdit.next(JSON.parse(JSON.stringify(emailTemplate)));
    // this.addComponent();
    this.router.navigate(['create-email-template',false], {queryParams: {returnUrl: this.state.url}});
  }

  onCancel() {
    this.templatesService.emailTemplateForEdit.next(new EmailTemplate());
    this.removeComponent();
  }

  onCreateNew() {
    this.removeComponent();
    this.templatesService.emailTemplateForEdit.next(new EmailTemplate());
    // this.addComponent(true);
    this.router.navigate(['create-email-template',true], {queryParams: {returnUrl: this.state.url}});
  }

  addComponent(newTemplate: boolean = false) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CreateEmailTemplateFormComponent);
    const component = this.container.createComponent(componentFactory);
    component.instance.createNewTemplate = newTemplate;
    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  removeComponent() {
    while(this.components.length > 0) {
      this.components.pop().destroy();
    }
  }
}
