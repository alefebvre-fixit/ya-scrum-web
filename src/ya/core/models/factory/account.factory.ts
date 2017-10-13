import { Account } from '../account';
import { User } from '../user';
import { Group } from '../group';

export class AccountFactory {

    public static create(user: User, group: Group): Account {

        const account: Account = new AccountImpl();
        account.group = {id: group.id, name: group.name};

        account.id = user.id;
        account.name = user.name;

        if (user.role) {
            account.role = user.role;
        }

        if (account.team) {
            account.team = user.team;
        }

        account.email = user.email;

        return Object.assign({}, account)

    }


}

class AccountImpl implements Account {

    id: string;
    name: string;
    role: string;
    team: string;
    email: string;

    group: { id, name };

}