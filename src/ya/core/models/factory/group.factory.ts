import { Group } from '../group';

export class GroupFactory {
    public static create(): Group {
        return Object.assign({}, new GroupImpl())
    }
}

class GroupImpl implements Group {
    id: string;
    name: string;
}