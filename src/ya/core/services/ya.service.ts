import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Sprint, Story } from '../models';
import { AuthenticationService } from './authentication.service';


export class YaService {

    constructor(
        private yaFirestore: AngularFirestore,
        private yaAuthentication: AuthenticationService,
    ) {
    }

    protected sprintCollection(): AngularFirestoreCollection<Sprint> {
        return this.yaFirestore.collection(this.sprintsUrl());
    }

    protected storyCollection(): AngularFirestoreCollection<Story> {
        return this.yaFirestore.collection(this.storiesUrl());
    }

    protected baseUrl(ressource: string): string {
        return this.yaAuthentication.baseUrl(ressource);
    }

    protected sprintsUrl() {
        return this.yaAuthentication.baseUrl('sprints/');
    }

    protected storiesUrl() {
        return this.yaAuthentication.baseUrl('stories/');
    }

    public filterPositive(value: number): number {
        if (value > 0) {
            return value;
        } else {
            return 0;
        }
    }

}
