import { Sprint, SprintProgress, SprintFilter, SprintStatus, MeetingStatus } from '../sprint';
import { Story } from '../story';
import { Impediment, Meeting } from '../impediment';

export class SprintFactory {


    public static create(): Sprint {

        const result = Object.assign({}, new SprintImpl());
        result.meeting = Object.assign({}, new MeetingStatusImpl());
        //result.impediment = Object.assign({}, new ImpedimentImpl());

        return result;
    }

    public static createProgress(): SprintProgress {
        return Object.assign({}, new SprintProgressImpl());
    }

    public static createImpediment(): Impediment {
        return Object.assign({}, new ImpedimentImpl());
    }

}

export class MeetingStatusImpl implements MeetingStatus {

    day = 0;
    status = SprintStatus.CLOSED;

}

class SprintImpl implements Sprint {


    id: string;
    code: string;
    name: string;

    status: SprintStatus.NEW;
    filter_status: SprintFilter.PENDING;


    startDate: string;
    endDate: string;
    duration = 15;
    meeting;

    estimate = 0;
    progress = 0;
    remaining = 0;

    velocity: number;

    conversationId: string;
    scrumMasterId: string;

    background: string;
    thumbnail: string;
    storyNumber = 0;

    impediment: Impediment;
}


class SprintProgressImpl implements SprintProgress {

    date: Date;
    day = 1;

    total = 0;
    previous = 0;
    daily = 0;
    remaining = 0;

    sprintId: string;

}


class ImpedimentImpl implements Impediment {

    id: string;
    name: string;

    description: string;
    comment: string;

    estimate: number;

    sprintId: string;

    meetings: Meeting[];


}