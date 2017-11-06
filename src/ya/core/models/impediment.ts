
export interface Impediment {

    id: string;
    name: string;

    description: string;
    comment: string;

    estimate: number;

    sprintId: string;

    meetings: Meeting[];

}


export interface Meeting {

    date: Date;
    day: number;
    total: number;
    previous: number;
    daily: number;

}
