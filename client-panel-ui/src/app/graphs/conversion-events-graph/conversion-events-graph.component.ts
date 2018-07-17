import {
  Component, ComponentFactoryResolver, OnChanges, OnInit, SimpleChanges, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Chart} from 'chart.js'
import {ReportsService} from "../../_services/reports.service";
import {BaseGraphComponent} from "../base-graph/base-graph.component";


@Component({
  selector: 'app-conversion-events-graph',
  templateUrl: './conversion-events-graph.component.html',
  styleUrls: ['./conversion-events-graph.component.scss']
})
export class ConversionEventsGraphComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

  public xAxesLabels = {
    lineChartDayLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6",
      "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14",
      "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22",
      "Day 23", "Day 24"],
    lineChartMonthLabels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6",
      "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12", "Month 13", "Month 14",
      "Month 15", "Month 16", "Month 17", "Month 18", "Month 19", "Month 20", "Month 21", "Month 22",
      "Month 23", "Month 24"],
    lineChartWeekLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6",
      "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Week 14",
      "Week 15", "Week 16", "Week 17", "Week 18", "Week 19", "Week 20", "Week 21", "Week 22",
      "Week 23", "Week 24"]
  };
  public conversionEventsChartData: Array<any> = [];
  public conversionEventsChartLabels: Array<any> = [];
  public conversionEventsChartOptions: any = {};
  public conversionEventsChartColors: Array<any> = [];
  public conversionEventsChartLegend: boolean;
  public conversionEventsChartType: string;

  constructor(private reportsService: ReportsService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.conversionEventsChartData = this.reportsService.conversionEventsChartData;
    this.conversionEventsChartLabels = this.xAxesLabels.lineChartDayLabels;
    this.conversionEventsChartOptions = this.reportsService.lineChartOptions.options;
    this.conversionEventsChartColors = this.reportsService.lineChartColors;
    this.conversionEventsChartLegend = this.reportsService.lineChartLegend;
    this.conversionEventsChartType = this.reportsService.lineChartType;
    this.addComponent();
  }

  addComponent() {
    this.components.forEach((v, i, a) => {
      v.destroy();
    });
    this.components = [];
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BaseGraphComponent);
    const component = this.container.createComponent(componentFactory);
    component.instance._ref = component;
    component.instance._parentRef = this;
    component.instance.datasets = this.conversionEventsChartData;
    component.instance.labels = this.conversionEventsChartLabels;
    component.instance.options = this.conversionEventsChartOptions;
    component.instance.chartType = this.conversionEventsChartType;
    component.instance.legend = this.conversionEventsChartLegend;
    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }


  // https://valor-software.com/ng2-charts/ (Reference)
  // Make the below function reusable by specifying it in ReportsService instead of specifying it here in different components.
  getDailyOrWeeklyOrMonthlyReports($event) {
    if ($event == 'Daily') {
      let _lineChartData: Array<any> = new Array(this.conversionEventsChartData.length);
      _lineChartData[0] = {
        data: [98, 48, 40, 19, 86, 27, 90, 35, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
        label: this.conversionEventsChartData[0].label
      };
      _lineChartData[1] = {
        data: [50, 11, 55, 92, 15, 19, 62, 84, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
        label: this.conversionEventsChartData[1].label
      };
      _lineChartData[2] = {
        data: [85, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 96, 75, 54, 72, 49, 95, 41, 58, 38, 96],
        label: this.conversionEventsChartData[2].label
      };
      this.conversionEventsChartData = _lineChartData;
      this.conversionEventsChartLabels = this.xAxesLabels.lineChartDayLabels;
    }
    else if ($event == 'Weekly') {
      let _lineChartData: Array<any> = new Array(this.conversionEventsChartData.length);
      _lineChartData[0] = {
        data: [49, 47, 75, 61, 42, 90, 67, 20, 45, 89, 75, 57, 30, 50, 19, 62, 84, 11, 55, 92, 15, 28, 58, 76],
        label: this.conversionEventsChartData[0].label
      };
      _lineChartData[1] = {
        data: [65, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 56],
        label: this.conversionEventsChartData[1].label
      };
      _lineChartData[2] = {
        data: [27, 90, 35, 91, 58, 48, 76, 70, 85, 70, 25, 62, 84, 11, 55, 92, 15, 28, 58, 76, 61, 42, 90, 67],
        label: this.conversionEventsChartData[2].label
      };

      this.conversionEventsChartData = _lineChartData;
      this.conversionEventsChartLabels = this.xAxesLabels.lineChartWeekLabels;
    }
    else {
      let _lineChartData: Array<any> = new Array(this.conversionEventsChartData.length);
      _lineChartData[0] = {
        data: [28, 48, 40, 19, 86, 27, 90, 35, 91, 58, 48, 76, 70, 85, 70, 25, 95, 62, 84, 98, 32, 47, 62, 77],
        label: this.conversionEventsChartData[0].label
      };
      _lineChartData[1] = {
        data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
        label: this.conversionEventsChartData[1].label
      };
      _lineChartData[2] = {
        data: [49, 47, 75, 61, 42, 90, 67, 20, 45, 89, 75, 57, 30, 50, 19, 62, 84, 11, 55, 92, 15, 28, 58, 76],
        label: this.conversionEventsChartData[2].label
      };
      this.conversionEventsChartData = _lineChartData;
      this.conversionEventsChartLabels = this.xAxesLabels.lineChartMonthLabels;
      this.addComponent();
    }
    this.addComponent();
  }
}
