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
import {TotalLeft} from '../models';
import {TotalLeftRepository} from '../repositories';

export class TotalLeftController {
  constructor(
    @repository(TotalLeftRepository)
    public totalLeftRepository : TotalLeftRepository,
  ) {}

  @post('/total-lefts')
  @response(200, {
    description: 'TotalLeft model instance',
    content: {'application/json': {schema: getModelSchemaRef(TotalLeft)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TotalLeft, {
            title: 'NewTotalLeft',
            exclude: ['id'],
          }),
        },
      },
    })
    totalLeft: Omit<TotalLeft, 'id'>,
  ): Promise<TotalLeft> {
    return this.totalLeftRepository.create(totalLeft);
  }

  @get('/total-lefts/count')
  @response(200, {
    description: 'TotalLeft model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TotalLeft) where?: Where<TotalLeft>,
  ): Promise<Count> {
    return this.totalLeftRepository.count(where);
  }

  @get('/total-lefts')
  @response(200, {
    description: 'Array of TotalLeft model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TotalLeft, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TotalLeft) filter?: Filter<TotalLeft>,
  ): Promise<TotalLeft[]> {
    return this.totalLeftRepository.find(filter);
  }

  @patch('/total-lefts')
  @response(200, {
    description: 'TotalLeft PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TotalLeft, {partial: true}),
        },
      },
    })
    totalLeft: TotalLeft,
    @param.where(TotalLeft) where?: Where<TotalLeft>,
  ): Promise<Count> {
    return this.totalLeftRepository.updateAll(totalLeft, where);
  }

  @get('/total-lefts/{id}')
  @response(200, {
    description: 'TotalLeft model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TotalLeft, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TotalLeft, {exclude: 'where'}) filter?: FilterExcludingWhere<TotalLeft>
  ): Promise<TotalLeft> {
    return this.totalLeftRepository.findById(id, filter);
  }

  @patch('/total-lefts/{id}')
  @response(204, {
    description: 'TotalLeft PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TotalLeft, {partial: true}),
        },
      },
    })
    totalLeft: TotalLeft,
  ): Promise<void> {
    await this.totalLeftRepository.updateById(id, totalLeft);
  }

  @put('/total-lefts/{id}')
  @response(204, {
    description: 'TotalLeft PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() totalLeft: TotalLeft,
  ): Promise<void> {
    await this.totalLeftRepository.replaceById(id, totalLeft);
  }

  @del('/total-lefts/{id}')
  @response(204, {
    description: 'TotalLeft DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.totalLeftRepository.deleteById(id);
  }
}
