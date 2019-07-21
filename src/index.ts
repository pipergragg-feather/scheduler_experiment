import { IJobQueryResults, IEventNotifier } from './types';

export class Scheduler {
    eventNotifier: IEventNotifier;
    jobQueryResults: IJobQueryResults;

    constructor({
        eventNotifier,
        jobQueryResults,
    }: {
        eventNotifier: IEventNotifier;
        jobQueryResults: IJobQueryResults;
    }) {
        console.log('Constructor');
        this.eventNotifier = eventNotifier;
        this.jobQueryResults = jobQueryResults;
    }

    async scheduleJobs() {
        console.log('abc');
        console.log({ queryResults: this.jobQueryResults });
        for (const queryResult of this.jobQueryResults) {
            await this.eventNotifier.subscriptionPlanChangeOver({
                subscriptionId: queryResult.subscriptionId,
            });
        }
    }
}
