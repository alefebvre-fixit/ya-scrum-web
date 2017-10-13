import { Story, StoryStatus, StoryFilter, StoryProgress } from '../story';

export class StoryFactory {
    public static create(): Story {

        const result: Story = new StoryImpl();

        result.priority = 1;
        result.status = StoryStatus.NEW;
        result.type = 'feature';
        result.estimate = 1;
        result.theme = 'pink';


        return Object.assign({}, result)
    }

    public static createProgress(): StoryProgress {

        const result: StoryProgress = new StoryProgressImpl();


        return Object.assign({}, result)
    }
}



class StoryImpl implements Story {


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


class StoryProgressImpl implements StoryProgress {

    date: Date;
    day = 0;
    total = 0;
    previous = 0;
    daily = 0;
    remaining = 0;
    storyId: string;

    public static progressAsPercentage(story: StoryProgress): number {

        if (story === undefined) {
            return 0;
        }

        const total = story.daily + story.previous + story.remaining;
        const progress = story.daily + story.previous;

        if (total === 0) {
            return 0;
        }

        return Math.round((progress / total) * 100);
    }
}