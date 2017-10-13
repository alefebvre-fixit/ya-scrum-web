import { User } from '../user';

export class UserFactory {
    public static create(): User {
        return Object.assign({}, new UserImpl())
    }
}

class UserImpl implements User {

    id: string;
    name: string;
    role: string;
    team: string;
    email: string;

}