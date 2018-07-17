import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {EditorSelected, EmailTemplate} from "../../_models/email";
import {TemplatesService} from "../../_services/templates.service";
import {CreateEmailTemplateFormComponent} from "./create-email-template-form/create-email-template-form.component";

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {

  emailTemplates = new Array<EmailTemplate>();

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

  constructor(public templatesService: TemplatesService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.templatesService.castEmailTemplates.subscribe(
      (emailTemplates) => {
        this.emailTemplates = emailTemplates;
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

  onEdit(emailTemplate: EmailTemplate) {
    this.removeComponent();
    console.log(JSON.parse(JSON.stringify(emailTemplate)));
    this.templatesService.emailTemplateForEdit.next(JSON.parse(JSON.stringify(emailTemplate)));
    this.addComponent();
  }

  onCancel() {
    this.templatesService.emailTemplateForEdit.next(new EmailTemplate());
    this.removeComponent();
  }

  onCreateNew() {
    this.removeComponent();
    this.templatesService.emailTemplateForEdit.next(new EmailTemplate());
    this.addComponent(true);
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
