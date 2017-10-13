
import { Group } from './group';
import { Invite } from './invite';

export interface User {

    id: string;
    name: string;
    role: string;
    team: string;
    email: string;

}

export class SignIn {
    email: string;
    password: string;
}

export class SignUp {

    name: string;
    email: string;
    password: string;

    invite?: Invite;
    group?: Group;

}

