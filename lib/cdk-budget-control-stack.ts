import { Stack, StackProps } from 'aws-cdk-lib';
import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import { Construct } from 'constructs';

export class CdkBudgetControlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const notification_email = 'marek.kuczynski@gmail.com'

    const cfnBudget = new CfnBudget(this, 'LambdaBudget', {
      budget: {
        budgetType: 'USAGE',
        timeUnit: 'MONTHLY',
        costFilters: {
          'UsageType': ['EU-Lambda-GB-Second', 'Lambda-GB-Second'],
          'Operation': ['Invoke']
        },
        budgetLimit: {
          amount: 1000000,
          unit: 'unit'
        },
        budgetName: 'GBSecBudget',
        costTypes: {
          includeCredit: false,
          includeDiscount: false,
          includeOtherSubscription: false,
          includeRecurring: false,
          includeRefund: false,
          includeSubscription: false,
          includeSupport: false,
          includeTax: false,
          includeUpfront: false,
          useAmortized: false,
          useBlended: false,
        }
      },
    
      // the properties below are optional
      notificationsWithSubscribers: [
        {
          notification: {
            comparisonOperator: 'GREATER_THAN',
            notificationType: 'ACTUAL',
            threshold: 50,
            thresholdType: 'PERCENTAGE',
          },
          subscribers: [{
            address: notification_email,
            subscriptionType: 'EMAIL',
          }],
        },
        {
          notification: {
            comparisonOperator: 'GREATER_THAN',
            notificationType: 'ACTUAL',
            threshold: 100,
            thresholdType: 'PERCENTAGE',
          },
          subscribers: [{
            address: notification_email,
            subscriptionType: 'EMAIL'
          }],
        }
      ],
    })
  }
};