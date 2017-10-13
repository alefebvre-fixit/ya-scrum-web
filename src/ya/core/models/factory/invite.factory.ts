import { Invite } from '../invite';

export class InviteFactory {
    public static create(): Invite {
        return Object.assign({}, new InviteImpl())
    }
}

class InviteImpl implements Invite {

    id: string;
    name = '';
    email = '';
    date: string;
    groupId: string;

    // public static getUpdate(group: any): any {

    //     const result = Object.assign({}, group);

    //     return result;
    // }

    // public static create(): Invite {
    //     const result: Invite = new Invite();
    //     return result;
    // }

}

