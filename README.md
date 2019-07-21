# Scheduler

Runs on a schedule to fire off event notifications based on rule sets. An example rule set could be "for all subscriptions with a  subscription_plan which has a startDate in the last 30 days but does not have a corresponding changeOver event, fire a changeOver event." 

A single hangler should be used per scheduler, in order to allow different schedulers to be run at different rates. 