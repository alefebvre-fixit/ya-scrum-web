
import { Group } from './group';
import { User } from './user';
import { Invite } from './invite';


// export class AccountGroup {
//     name: string;
//     groupId: string;

//     public static createFromGroup(group: Group): AccountGroup {

//         const result = new AccountGroup();

//         result.groupId = group.id;
//         result.name = group.name;

//         return result;

//     }
// }

export interface Account extends User {

    group: Group;

    // public static createFromUser(user: User, group: Group): Account {

    //     const account: Account = new Account();

    //     account.group = AccountGroup.createFromGroup(group);

    //     account.id = user.id;
    //     account.name = user.name;

    //     if (user.role) {
    //         account.role = user.role;
    //     }

    //     if (account.team) {
    //         account.team = user.team;
    //     }

    //     account.email = user.email;

    //     return account;
    // }

}


