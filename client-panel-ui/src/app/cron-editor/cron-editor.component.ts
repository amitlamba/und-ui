import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {CronOptions} from "./CronOptions";
import {Days, Months, MonthWeeks} from "./enums";


@Component({
  selector: "cron-editor",
  templateUrl: 'cron-editor.template.html',
  styleUrls: ['cron-editor.component.scss']
})
export class CronGenComponent implements OnInit, OnChanges {
  @Input() public disabled: boolean;
  @Input() public options: CronOptions;
  public multiSelectOption: Select2Options;
  myDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  @Input()
  get cron(): string {
    return this.localCron;
  }

  set cron(value: string) {
    this.localCron = value;
    this.cronChange.emit(this.localCron);
  }

  // the name is an Angular convention, @Input variable name + "Change" suffix
  @Output() cronChange = new EventEmitter();

  public activeTab: string;
  public selectOptions = this.getSelectOptions();
  public state: any;

  private localCron: string;
  private isDirty: boolean;

  public async ngOnInit() {
    this.state = this.getDefaultState();
    this.multiSelectOption = {
      multiple: true
    };
    this.handleModelChange(this.cron);
  }

  public async ngOnChanges(changes: SimpleChanges) {
    const newCron = changes["cron"];
    if (newCron && !newCron.firstChange) {
      this.handleModelChange(this.cron);
    }
  }

  public setActiveTab(tab: string) {
    if (!this.disabled) {
      this.activeTab = tab;
      this.regenerateCron();
    }
  }

  public dayDisplay(day: string): string {
    return Days[day];
  }

  public monthWeekDisplay(monthWeekNumber: number): string {
    return MonthWeeks[monthWeekNumber];
  }

  public monthDisplay(month: number): string {
    return Months[month];
  }

  public monthDayDisplay(month: string): string {
    if (month === "L") {
      return "Last Day";
    } else if (month === "LW") {
      return "Last Weekday";
    } else if (month === "1W") {
      return "First Weekday";
    } else {
      return `${month}${this.getOrdinalSuffix(month)} day`;
    }
  }

  public regenerateCron() {
    this.isDirty = true;
    switch (this.activeTab) {
      case "minutes":
        this.cron = `${this.state.minutes.seconds} 0/${this.state.minutes.minutes} * 1/1 * ? *`;
        break;
      case "hourly":
        this.cron = `${this.state.hourly.seconds} ${this.state.hourly.minutes} 0/${this.state.hourly.hours} 1/1 * ? *`;
        break;
      case "daily":
        switch (this.state.daily.subTab) {
          case "everyDays":
            this.cron = `${this.state.daily.everyDays.seconds} ${this.state.daily.everyDays.minutes} ${this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType)} 1/${this.state.daily.everyDays.days} * ? *`;
            break;
          case "everyWeekDay":
            this.cron = `${this.state.daily.everyWeekDay.seconds} ${this.state.daily.everyWeekDay.minutes} ${this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType)} ? * MON-FRI *`;
            break;
          default:
            throw "Invalid cron daily subtab selection";
        }
        break;
      case "weekly":
        const days = this.selectOptions.days
          .reduce((acc, day) => this.state.weekly[day] ? acc.concat([day]) : acc, [])
          .join(",");
        this.cron = `${this.state.weekly.seconds} ${this.state.weekly.minutes} ${this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType)} ? * ${days} *`;
        break;
      case "monthly":
        switch (this.state.monthly.subTab) {
          case "specificDay":
            this.cron = `${this.state.monthly.specificDay.seconds} ${this.state.monthly.specificDay.minutes} ${this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType)} ${this.state.monthly.specificDay.days.map((value,index)=>{if(value) {return this.getSelectOptions().monthDaysWithLasts[index]} else return null}).filter((value, index)=>{if(value) return true;}).join(",")} 1/${this.state.monthly.specificDay.months} ? *`;
            break;
          case "specificWeekDay":
            this.cron = `${this.state.monthly.specificWeekDay.seconds} ${this.state.monthly.specificWeekDay.minutes} ${this.hourToCron(this.state.monthly.specificWeekDay.hours, this.state.monthly.specificWeekDay.hourType)} ? 1/${this.state.monthly.specificWeekDay.months} ${this.state.monthly.specificWeekDay.days.map((value,index,array)=>{let d=index%7;let w=Math.floor(index/7); if(value) return this.myDays[d]+this.selectOptions.monthWeeks[w];}).filter((value, index)=>{console.log(value);if(value) return true;}).join(",")} *`;
            break;
          default:
            throw "Invalid cron monthly subtab selection";
        }
        break;
      case "yearly":
        switch (this.state.yearly.subTab) {
          case "specificMonthDay":
            this.cron = `${this.state.yearly.specificMonthDay.seconds} ${this.state.yearly.specificMonthDay.minutes} ${this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType)} ${this.state.yearly.specificMonthDay.day} ${this.state.yearly.specificMonthDay.month} ? *`;
            break;
          case "specificMonthWeek":
            this.cron = `${this.state.yearly.specificMonthWeek.seconds} ${this.state.yearly.specificMonthWeek.minutes} ${this.hourToCron(this.state.yearly.specificMonthWeek.hours, this.state.yearly.specificMonthWeek.hourType)} ? ${this.state.yearly.specificMonthWeek.month} ${this.state.yearly.specificMonthWeek.day}${this.state.yearly.specificMonthWeek.monthWeek} *`;
            break;
          default:
            throw "Invalid cron yearly subtab selection";
        }
        break;
      case "advanced":
        this.cron = this.state.advanced.expression;
        break;
      default:
        throw "Invalid cron active tab selection";
    }
  }

  private getAmPmHour(hour: number) {
    return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
  }

  private getHourType(hour: number) {
    return this.options.use24HourTime ? undefined : (hour >= 12 ? "PM" : "AM");
  }

  private hourToCron(hour: number, hourType: string) {
    if (this.options.use24HourTime) {
      return hour;
    } else {
      return hourType === "AM" ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
    }
  }

  private handleModelChange(cron: string) {
    if (this.isDirty) {
      this.isDirty = false;
      return;
    } else {
      this.isDirty = false;
    }

    if (!this.cronIsValid(cron)) {
      throw "Invalid cron expression, there must be 6 or 7 segments";
    }

    const [seconds, minutes, hours, dayOfMonth, month, dayOfWeek] = cron.split(" ");

    if (cron.match(/\d+ 0\/\d+ \* 1\/1 \* \? \*/)) {
      this.activeTab = "minutes";

      this.state.minutes.minutes = parseInt(minutes.substring(2));
      this.state.minutes.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ 0\/\d+ 1\/1 \* \? \*/)) {
      this.activeTab = "hourly";

      this.state.hourly.hours = parseInt(hours.substring(2));
      this.state.hourly.minutes = parseInt(minutes);
      this.state.hourly.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ 1\/\d+ \* \? \*/)) {
      this.activeTab = "daily";

      this.state.daily.subTab = "everyDays";
      this.state.daily.everyDays.days = parseInt(dayOfMonth.substring(2));
      const parsedHours = parseInt(hours);
      this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
      this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
      this.state.daily.everyDays.minutes = parseInt(minutes);
      this.state.daily.everyDays.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ \? \* MON-FRI \*/)) {
      this.activeTab = "daily";

      this.state.daily.subTab = "everyWeekDay";
      const parsedHours = parseInt(hours);
      this.state.daily.everyWeekDay.hours = this.getAmPmHour(parsedHours);
      this.state.daily.everyWeekDay.hourType = this.getHourType(parsedHours);
      this.state.daily.everyWeekDay.minutes = parseInt(minutes);
      this.state.daily.everyWeekDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ \? \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
      this.activeTab = "weekly";
      this.selectOptions.days.forEach(weekDay => this.state.weekly[weekDay] = false);
      dayOfWeek.split(",").forEach(weekDay => this.state.weekly[weekDay] = true);
      const parsedHours = parseInt(hours);
      this.state.weekly.hours = this.getAmPmHour(parsedHours);
      this.state.weekly.hourType = this.getHourType(parsedHours);
      this.state.weekly.minutes = parseInt(minutes);
      this.state.weekly.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ \? \*/)) {
      this.activeTab = "monthly";
      this.state.monthly.subTab = "specificDay";
      this.state.monthly.specificDay.day = dayOfMonth;
      this.state.monthly.specificDay.months = parseInt(month.substring(2));
      const parsedHours = parseInt(hours);
      this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
      this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
      this.state.monthly.specificDay.minutes = parseInt(minutes);
      this.state.monthly.specificDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ \? 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
      const day = dayOfWeek.substr(0, 3);
      const monthWeek = dayOfWeek.substr(3);
      this.activeTab = "monthly";
      this.state.monthly.subTab = "specificWeekDay";
      this.state.monthly.specificWeekDay.monthWeek = monthWeek;
      this.state.monthly.specificWeekDay.day = day;
      this.state.monthly.specificWeekDay.months = parseInt(month.substring(2));
      const parsedHours = parseInt(hours);
      this.state.monthly.specificWeekDay.hours = this.getAmPmHour(parsedHours);
      this.state.monthly.specificWeekDay.hourType = this.getHourType(parsedHours);
      this.state.monthly.specificWeekDay.minutes = parseInt(minutes);
      this.state.monthly.specificWeekDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ \? \*/)) {
      this.activeTab = "yearly";
      this.state.yearly.subTab = "specificMonthDay";
      this.state.yearly.specificMonthDay.month = parseInt(month);
      this.state.yearly.specificMonthDay.day = dayOfMonth;
      const parsedHours = parseInt(hours);
      this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
      this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
      this.state.yearly.specificMonthDay.minutes = parseInt(minutes);
      this.state.yearly.specificMonthDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ \? \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
      const day = dayOfWeek.substr(0, 3);
      const monthWeek = dayOfWeek.substr(3);
      this.activeTab = "yearly";
      this.state.yearly.subTab = "specificMonthWeek";
      this.state.yearly.specificMonthWeek.monthWeek = monthWeek;
      this.state.yearly.specificMonthWeek.day = day;
      this.state.yearly.specificMonthWeek.month = parseInt(month);
      const parsedHours = parseInt(hours);
      this.state.yearly.specificMonthWeek.hours = this.getAmPmHour(parsedHours);
      this.state.yearly.specificMonthWeek.hourType = this.getHourType(parsedHours);
      this.state.yearly.specificMonthWeek.minutes = parseInt(minutes);
      this.state.yearly.specificMonthWeek.seconds = parseInt(seconds);
    } else {
      this.activeTab = "advanced";
      this.state.advanced.expression = cron;
    }
  }

  private cronIsValid(cron: string): boolean {
    if (cron) {
      const cronParts = cron.split(" ");

      return cronParts.length === 6 || cronParts.length === 7;
    }

    return false;
  }

  private getDefaultState() {
    const [defaultHours, defaultMinutes, defaultSeconds] = this.options.defaultTime.split(":").map(Number);

    return {
      minutes: {
        minutes: 1,
        seconds: 0
      },
      hourly: {
        hours: 1,
        minutes: 0,
        seconds: 0
      },
      daily: {
        subTab: "everyDays",
        everyDays: {
          days: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        },
        everyWeekDay: {
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        }
      },
      weekly: {
        MON: true,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
        SUN: false,
        hours: this.getAmPmHour(defaultHours),
        minutes: defaultMinutes,
        seconds: defaultSeconds,
        hourType: this.getHourType(defaultHours)
      },
      monthly: {
        subTab: "specificDay",
        specificDay: {
          days: [false, true],
          months: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        },
        specificWeekDay: {
          monthWeek: "#1",
          days: [true],
          months: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        }
      },
      yearly: {
        subTab: "specificMonthDay",
        specificMonthDay: {
          month: 1,
          day: "1",
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        },
        specificMonthWeek: {
          monthWeek: "#1",
          day: "MON",
          month: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        }
      },
      advanced: {
        expression: "0 15 10 L-2 * ?"
      }
    };
  }

  private getOrdinalSuffix(value: string) {
    if (value.length > 1) {
      const secondToLastDigit = value.charAt(value.length - 2);
      if (secondToLastDigit === "1") {
        return "th";
      }
    }

    const lastDigit = value.charAt(value.length - 1);
    switch (lastDigit) {
      case "1":
        return "st";
      case "2":
        return "nd";
      case "3":
        return "rd";
      default:
        return "th";
    }
  }

  private getSelectOptions() {
    return {
      months: this.getRange(1, 12),
      monthWeeks: ["#1", "#2", "#3", "#4", "#5", "L"],
      days: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      minutes: this.getRange(0, 59),
      fullMinutes: this.getRange(0, 59),
      seconds: this.getRange(0, 59),
      hours: this.getRange(1, 23),
      monthDays: this.getRange(1, 31),
      monthDaysWithLasts: ["1W", "LW", "L", ...[...this.getRange(1, 31).map(String)]],
      hourTypes: ["AM", "PM"]
    };
  }

  private getRange(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.apply(null, Array(length)).map((_, i) => i + start);
  }
}
