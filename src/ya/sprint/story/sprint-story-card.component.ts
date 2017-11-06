import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Story, Sprint, StoryProgress } from '@ya-scrum/models';
import { StoryService } from '@ya-scrum/services';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { SprintStatus } from 'ya/core/models/sprint';

@Component({
  selector: 'ya-sprint-story-card',
  templateUrl: './sprint-story-card.component.html',
  styleUrls: ['./sprint-story-card.component.scss']
})
export class SprintStoryCardComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() story: Story;
  @Input() status: string = SprintStatus.CLOSED;

  progress: StoryProgress;
  private chart;

  constructor(
    private router: Router,
    private storyService: StoryService,
  ) {
  }

  ngOnInit(): void {
    this.progress = this.storyService.getLatestProgress(this.story);
  }

  ngAfterViewInit() {
    this.createChart(this.progress);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.progress = this.storyService.getLatestProgress(this.story);
    this.updateChart(this.progress);
  }

  public add() {
    this.updateProgress(+1);
  }

  public remove() {
    this.updateProgress(-1);
  }

  private updateProgress(increment: number) {

    //const cloned = Object.assign({}, this.story);
    
    this.progress = this.storyService.incrementDailyProgress(this.story, this.progress, increment);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story, this.story);
  }

  private updateChart(progress: StoryProgress) {

    if (this.chart === undefined) {
      this.createChart(progress);
    }
    if (this.chart !== undefined) {
      this.chart.load({
        columns: [
          ['previous', progress.previous],
          ['daily', progress.daily],
          ['remaining', progress.remaining]]
      });

      const node = d3.select('#' + this.story.id + ' text.c3-chart-arcs-title').node()
      if (node) {
        node.innerHTML = this.progressAsPercentage() + '%';
      }

    }


  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

  public progressAsPercentage(): number {
    return this.storyService.meetingProgress(this.progress);
  }

  createChart(progress: StoryProgress) {

    if (progress === undefined) {
      return;
    }

    this.chart = c3.generate({
      bindto: '#' + this.story.id,
      size: {
        width: 240,
        height: 240
      },
      data: {
        columns: [
          ['previous', progress.previous],
          ['daily', progress.daily],
          ['remaining', progress.remaining],
        ],
        order: null,
        type: 'donut',
        legend: {
          show: false
        },
      },
      donut: {
        title: this.progressAsPercentage() + '%',
        width: 15,
        label: {
          show: false
        }
      },
      legend: {
        show: false
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      color: {
        pattern: [
          '#455A64',
          '#546e7a',
          '#ededed',
        ]
      },
      transition: {
        duration: 200
      }
    });
  }

  public isOpen(): boolean {
    return SprintStatus.OPEN === this.status;
  }

}
