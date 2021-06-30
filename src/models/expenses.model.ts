import {Entity, model, property} from '@loopback/repository';

@model()
export class Expenses extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;


  constructor(data?: Partial<Expenses>) {
    super(data);
  }
}

export interface ExpensesRelations {
  // describe navigational properties here
}

export type ExpensesWithRelations = Expenses & ExpensesRelations;
