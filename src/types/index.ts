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
