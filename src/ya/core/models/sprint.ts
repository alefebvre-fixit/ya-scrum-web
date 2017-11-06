import { Story } from './story';
import { Impediment } from './impediment';

export interface MeetingStatus {

    day: number;
    status: SprintStatus;

}

export enum SprintStatus {

    CLOSED = 'closed',
    OPEN = 'open',
    NEW = 'new',
    STARTED = 'started'
}

export enum SprintFilter {

    PROGRESS = 'progress',
    PENDING = 'pending',
    CLOSED = 'closed'

}


export interface Sprint {

    id: string;
    code: string;
    name: string;

    status: SprintStatus;
    filter_status: SprintFilter;

    startDate: string;
    endDate: string;
    duration: number;
    meeting: MeetingStatus;

    estimate: number;
    progress: number;
    remaining: number;

    velocity: number;

    conversationId: string;
    scrumMasterId: string;

    background: string;
    thumbnail: string;
    storyNumber: number;

    impediment: Impediment;


}


export interface SprintProgress {

    date: Date;
    day: number;

    total: number;
    previous: number;
    daily: number;
    remaining: number;

    sprintId: string;

}