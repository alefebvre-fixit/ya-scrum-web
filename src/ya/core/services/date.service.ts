import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  private holidays = [
    '12/31+5', // New Year's Day on a saturday celebrated on previous friday
    '1/1',     // New Year's Day
    '1/2+1',   // New Year's Day on a sunday celebrated on next monday
    '1-3/1',   // Birthday of Martin Luther King, third Monday in January
    '2-3/1',   // Washington's Birthday, third Monday in February
    '5~1/1',   // Memorial Day, last Monday in May
    '7/3+5',   // Independence Day
    '7/4',     // Independence Day
    '7/5+1',   // Independence Day
    '9-1/1',   // Labor Day, first Monday in September
    '10-2/1',  // Columbus Day, second Monday in October
    '11/10+5', // Veterans Day
    '11/11',   // Veterans Day
    '11/12+1', // Veterans Day
    '11-4/4',  // Thanksgiving Day, fourth Thursday in November
    '12/24+5', // Christmas Day
    '12/25',   // Christmas Day
    '12/26+1',  // Christmas Day
  ];

  constructor(
  ) { }

  public businessDaysFromDate(date, businessDays): Date {
    let counter = 0;
    const result = new Date(date);
    while (businessDays >= 0) {
      result.setTime(date.getTime() + counter * 86400000);
      if (this.isBusinessDay(result)) {
        --businessDays;
      }
      ++counter;
    }
    return result;
  }

  public isBusinessDay(date): boolean {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend
      return false;
    }

    const dayOfMonth = date.getDate(),
      month = date.getMonth() + 1,
      monthDay = month + '/' + dayOfMonth;

    if (this.holidays.indexOf(monthDay) > -1) {
      return false;
    }

    const monthDayDay = monthDay + '+' + dayOfWeek;
    if (this.holidays.indexOf(monthDayDay) > -1) {
      return false;
    }

    const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1,
      monthWeekDay = month + '-' + weekOfMonth + '/' + dayOfWeek;
    if (this.holidays.indexOf(monthWeekDay) > -1) {
      return false;
    }

    const lastDayOfMonth = new Date(date);
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    const negWeekOfMonth = Math.floor((lastDayOfMonth.getDate() - dayOfMonth - 1) / 7) + 1,
      monthNegWeekDay = month + '~' + negWeekOfMonth + '/' + dayOfWeek;
    if (this.holidays.indexOf(monthNegWeekDay) > -1) {
      return false;
    }

    return true;
  }


}
