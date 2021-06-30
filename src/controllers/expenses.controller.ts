import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Expenses} from '../models';
import {ExpensesRepository} from '../repositories';

export class ExpensesController {
  constructor(
    @repository(ExpensesRepository)
    public expensesRepository : ExpensesRepository,
  ) {}

  @post('/expenses')
  @response(200, {
    description: 'Expenses model instance',
    content: {'application/json': {schema: getModelSchemaRef(Expenses)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expenses, {
            title: 'NewExpenses',
            exclude: ['id'],
          }),
        },
      },
    })
    expenses: Omit<Expenses, 'id'>,
  ): Promise<Expenses> {
    return this.expensesRepository.create(expenses);
  }

  @get('/expenses/count')
  @response(200, {
    description: 'Expenses model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Expenses) where?: Where<Expenses>,
  ): Promise<Count> {
    return this.expensesRepository.count(where);
  }

  @get('/expenses')
  @response(200, {
    description: 'Array of Expenses model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Expenses, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Expenses) filter?: Filter<Expenses>,
  ): Promise<Expenses[]> {
    return this.expensesRepository.find(filter);
  }

  @patch('/expenses')
  @response(200, {
    description: 'Expenses PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expenses, {partial: true}),
        },
      },
    })
    expenses: Expenses,
    @param.where(Expenses) where?: Where<Expenses>,
  ): Promise<Count> {
    return this.expensesRepository.updateAll(expenses, where);
  }

  @get('/expenses/{id}')
  @response(200, {
    description: 'Expenses model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Expenses, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Expenses, {exclude: 'where'}) filter?: FilterExcludingWhere<Expenses>
  ): Promise<Expenses> {
    return this.expensesRepository.findById(id, filter);
  }

  @patch('/expenses/{id}')
  @response(204, {
    description: 'Expenses PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Expenses, {partial: true}),
        },
      },
    })
    expenses: Expenses,
  ): Promise<void> {
    await this.expensesRepository.updateById(id, expenses);
  }

  @put('/expenses/{id}')
  @response(204, {
    description: 'Expenses PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() expenses: Expenses,
  ): Promise<void> {
    await this.expensesRepository.replaceById(id, expenses);
  }

  @del('/expenses/{id}')
  @response(204, {
    description: 'Expenses DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.expensesRepository.deleteById(id);
  }
}
