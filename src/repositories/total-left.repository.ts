import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {TotalLeft, TotalLeftRelations} from '../models';

export class TotalLeftRepository extends DefaultCrudRepository<
  TotalLeft,
  typeof TotalLeft.prototype.id,
  TotalLeftRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(TotalLeft, dataSource);
  }
}
