import { Sprint, SprintProgress, SprintFilter, SprintStatus, MeetingStatus } from '../sprint';
import { Story } from '../story';

export class SprintFactory {


    public static create(): Sprint {
        return Object.assign({}, new SprintImpl())
    }

    public static createProgress(): SprintProgress {
        return Object.assign({}, new SprintProgressImpl())
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
    meeting = new MeetingStatusImpl();

    estimate = 0;
    progress = 0;
    remaining = 0;

    velocity: number;

    conversationId: string;
    scrumMasterId: string;

    background: string;
    thumbnail: string;
    storyNumber = 0;

    impediment: Story;
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