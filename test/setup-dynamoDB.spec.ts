import { describe, expect, test } from 'vitest';
import { DynamoDB } from 'aws-sdk';
import { setupDynamoDB } from '../src/setup-dynamoDB';

describe('setupDynamoDB', () => {
  describe('table', () => {
    setupDynamoDB([
      {
        KeySchema: [
          {
            AttributeName: 'pk',
            KeyType: 'HASH', // Partition key
          },
          {
            AttributeName: 'sk',
            KeyType: 'RANGE', // Sort key
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: 'pk',
            AttributeType: 'S',
          },
          {
            AttributeName: 'sk',
            AttributeType: 'S',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: 'testTable',
      },
    ]);
    test('can create the table', async () => {
      const dynamoDB = new DynamoDB({
        endpoint: `http://localhost:${process.env.TEST_DYNAMODB_PORT ?? ''}`,
        region: 'local', // If not set, will get from ~/.aws directory or environment variable
        // and rest of properties
      });
      const tables = await dynamoDB.listTables().promise();
      expect(tables.TableNames).toEqual(['testTable']);
    });
  });
});
