import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'accounts',
  connector: 'postgresql',
  url: '',
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'fbank'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AccountsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'accounts';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.accounts', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
