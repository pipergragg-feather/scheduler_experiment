interface IJobQueryResult {
    subscriptionId: number;
}
export type IJobQueryResults = IJobQueryResult[];
export interface ISubscriptionPlanChangeArguments {
    subscriptionId: number;
}
export interface IEventNotifier {
    subscriptionPlanChangeOver(
        args: ISubscriptionPlanChangeArguments
    ): Promise<void>;
}

export interface IQuery {
    subscriptionPlanChangeOver(): Promise<IJobQueryResults>;
}

export enum ScheduledEvents {
    subscriptionPlanChangeOver = 'subscriptionPlanChangeOver',
}
