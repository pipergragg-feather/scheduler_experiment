import { Scheduler } from '../src';
import {
    IJobQueryResults,
    IEventNotifier,
    ISubscriptionPlanChangeArguments,
    IQuery,
} from '../src/types';

class MockEventNotifier implements IEventNotifier {
    mockFn: Function;
    constructor() {
        this.mockFn = jest.fn();
    }
    async subscriptionPlanChangeOver(
        args: ISubscriptionPlanChangeArguments
    ): Promise<void> {
        this.mockFn(args);
    }
}

class MockQuery implements IQuery {
    mockFn: Function;
    jobQueryResults: IJobQueryResults;
    constructor(jobQueryResults: IJobQueryResults) {
        this.mockFn = jest.fn();
        this.jobQueryResults = jobQueryResults;
    }
    async subscriptionPlanChangeOver(): Promise<IJobQueryResults> {
        this.mockFn();
        return this.jobQueryResults;
    }
}

it('Kicks off events based on rule conditions', async () => {
    const eventNotifier = new MockEventNotifier();
    const subscriptionId = 100502;
    const queryResults: IJobQueryResults = [{ subscriptionId }];
    const query = new MockQuery(queryResults);
    const scheduler = new Scheduler({
        eventNotifier: eventNotifier,
        query: query,
    });

    await scheduler.scheduleEvents();

    expect(eventNotifier.mockFn).toBeCalledWith(queryResults[0]);
});
