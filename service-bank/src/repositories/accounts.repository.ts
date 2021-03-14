import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AccountsDataSource} from '../datasources';
import {Accounts, AccountsRelations} from '../models';

export class AccountsRepository extends DefaultCrudRepository<
  Accounts,
  typeof Accounts.prototype.id,
  AccountsRelations
> {
  constructor(
    @inject('datasources.accounts') dataSource: AccountsDataSource,
  ) {
    super(Accounts, dataSource);
  }
}
