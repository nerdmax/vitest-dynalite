import { DynamoDB } from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import dynalite from 'dynalite';
import getPort from 'get-port';
import { beforeEach } from 'vitest';

const sleep = (time: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const waitForTable = async (client: DynamoDB, tableName: string) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const details = await client
      .describeTable({ TableName: tableName })
      .promise()
      .catch(() => undefined);

    if (details?.Table?.TableStatus === 'ACTIVE') {
      // eslint-disable-next-line no-await-in-loop
      await sleep(10);
      break;
    }
    // eslint-disable-next-line no-await-in-loop
    await sleep(10);
  }
};

export const setupDynamoDB = (createTableInputs: CreateTableInput[]): void => {
  beforeEach(async () => {
    // console.log(
    //   `SETUP DYNAMODB for vitest on TEST WORKER ID: ${process.env.VITEST_WORKER_ID}`
    // );
    const dynaliteInstance = dynalite({
      createTableMs: 0,
      deleteTableMs: 0,
      updateTableMs: 0,
    });

    const port = 4567 + parseInt(process.env.VITEST_WORKER_ID || '0', 10);
    const availablePort = await getPort({ port });
    process.env.TEST_DYNAMODB_PORT = availablePort.toString();
    if (!dynaliteInstance.listening) {
      await new Promise<void>(resolve => {
        dynaliteInstance.listen(process.env.TEST_DYNAMODB_PORT, resolve);
      });
    }

    const dynamoDB = new DynamoDB({
      endpoint: `http://localhost:${process.env.TEST_DYNAMODB_PORT}`,
      sslEnabled: false,
      region: 'local',
    });
    try {
      await Promise.all(
        createTableInputs.map(async createTableInput => {
          await dynamoDB.createTable(createTableInput).promise();

          await waitForTable(dynamoDB, createTableInput.TableName);
        })
      );
    } catch (err) {
      console.error(err);
    }
    return async () => {
      if (dynaliteInstance.listening) {
        await new Promise<void>(resolve => {
          dynaliteInstance.close(() => resolve());
        });
      }
    };
  });
};
