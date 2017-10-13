
export enum StoryStatus {

    NEW = 'new',
    STARTED = 'started',
    ASSIGNED = 'assigned',
    CLOSED = 'closed',

}

export enum StoryFilter {

    PROGRESS = 'progress',
    PENDING = 'pending',

}


export interface Story {

    id: string;
    name: string;
    type: string;
    theme: string;

    status: StoryStatus;
    filter_status: StoryFilter;

    description: string;
    acceptanceCriterias: string;
    comment: string;
    duration: number;

    priority: number;

    estimate: number;

    sprintId: string;

    productOwnerId: string;
    history: StoryProgress[];

}


export interface StoryProgress {

    date: Date;
    day: number;
    total: number;
    previous: number;
    daily: number;
    remaining: number;
    storyId: string;

}
