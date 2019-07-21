import { Scheduler } from '../src';
import {
    IJobQueryResults,
    IEventNotifier,
    ISubscriptionPlanChangeArguments,
} from '../src/types';

class MockEventNotifier implements IEventNotifier {
    mockFn: Function;
    constructor() {
        this.mockFn = jest.fn();
    }
    async subscriptionPlanChangeOver(
        args: ISubscriptionPlanChangeArguments
    ): Promise<void> {
        console.log({ args });
        this.mockFn(args);
    }
}

it('Kicks off events based on rule conditions', async () => {
    const eventNotifier = new MockEventNotifier();
    const subscriptionId = 100502;
    const queryResults: IJobQueryResults = [{ subscriptionId }];

    const scheduler = new Scheduler({
        eventNotifier: eventNotifier,
        jobQueryResults: queryResults,
    });
    console.log({ scheduler });
    await scheduler.scheduleJobs();

    expect(eventNotifier.mockFn).toBeCalledWith(queryResults[0]);
});
