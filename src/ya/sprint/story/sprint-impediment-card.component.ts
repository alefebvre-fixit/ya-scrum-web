import { ImpedimentService } from '../../core/services/impediment.service';
import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Story, Sprint, Impediment, Meeting } from '@ya-scrum/models';
import { StoryService } from '@ya-scrum/services';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { SprintStatus } from 'ya/core/models/sprint';

@Component({
  selector: 'ya-sprint-impediment-card',
  templateUrl: './sprint-impediment-card.component.html',
  styleUrls: ['./sprint-impediment-card.component.scss']
})
export class SprintImpedimentCardComponent implements OnInit, OnChanges {

  @Input() sprint: Sprint;
  @Input() status: string = SprintStatus.CLOSED;

  meeting: Meeting;
  private chart;

  constructor(
    private router: Router,
    private impedimentService: ImpedimentService,
  ) {
  }

  ngOnInit(): void {
    this.meeting = this.impedimentService.getLatestMeeting(this.sprint);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.meeting = this.impedimentService.getLatestMeeting(this.sprint);
  }

  public add() {
    this.incrementTimeSpent(+1);
  }

  public remove() {
    this.incrementTimeSpent(-1);
  }

  private incrementTimeSpent(increment: number) {
    this.meeting = this.impedimentService.incrementTimeSpent(this.sprint, this.meeting, increment);
  }

  public isOpen(): boolean {
    return SprintStatus.OPEN === this.status;
  }

}
