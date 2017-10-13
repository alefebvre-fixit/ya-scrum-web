import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ya-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
})
export class TrendComponent implements OnInit, OnChanges {

  @Input() amount: any;
  public trend: string;

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.trend = this.getTrend(this.amount);
  }

  ngOnChanges(): void {
    this.trend = this.getTrend(this.amount);
  }

  private getTrend(value: any): string {
    const v = -value;
    if (v > 0) {
        return 'up';
      } else if (v < 0) {
        return 'down';
      } else {
        return 'flat';
      }
  }

}
