import {Entity, model, property} from '@loopback/repository';

@model()
export class Accounts extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  referenceUser: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  userAgent: string;

  @property({
    type: 'string',
    required: true,
  })
  operatingSystem: string;

  @property({
    type: 'string',
    required: true,
  })
  userIP: string;


  constructor(data?: Partial<Accounts>) {
    super(data);
  }
}

export interface AccountsRelations {
  // describe navigational properties here
}

export type AccountsWithRelations = Accounts & AccountsRelations;
