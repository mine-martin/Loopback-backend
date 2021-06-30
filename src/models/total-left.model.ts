import {Entity, model, property} from '@loopback/repository';

@model()
export class TotalLeft extends Entity {
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


  constructor(data?: Partial<TotalLeft>) {
    super(data);
  }
}

export interface TotalLeftRelations {
  // describe navigational properties here
}

export type TotalLeftWithRelations = TotalLeft & TotalLeftRelations;
