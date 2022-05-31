#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkBudgetControlStack } from '../lib/cdk-budget-control-stack';

const app = new cdk.App();
new CdkBudgetControlStack(app, 'CdkBudgetControlStack', {});
