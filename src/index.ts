import { IQuery, IEventNotifier, ScheduledEvents } from './types';

export class Scheduler {
    eventNotifier: IEventNotifier;
    query: IQuery;

    constructor({
        eventNotifier,
        query,
    }: {
        eventNotifier: IEventNotifier;
        query: IQuery;
    }) {
        this.eventNotifier = eventNotifier;
        this.query = query;
    }

    async scheduleEvents() {
        const eventJobs: Promise<void[]>[] = [];
        for (const event in ScheduledEvents) {
            eventJobs.push(this.scheduleEvent(event as ScheduledEvents));
        }
        await Promise.all(eventJobs);
    }

    private async scheduleEvent(event: ScheduledEvents) {
        const queryResults = await this.query[event]();
        const scheduledJobs: Promise<void>[] = queryResults.map(queryResult => {
            return this.eventNotifier[event]({
                subscriptionId: queryResult.subscriptionId,
            });
        });
        return await Promise.all(scheduledJobs);
    }
}
