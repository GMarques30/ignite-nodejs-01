import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchTasksUseCase } from '../../../domain/application/use-cases/fetch-tasks'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { TaskPresenter } from '../presenters/task-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryParamSchema = z.string().optional()

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type QueryParamSchema = z.infer<typeof queryParamSchema>

@Controller('/tasks')
export class FetchTasksController {
  constructor(private readonly fetchTasksUseCase: FetchTasksUseCase) {}

  @Get()
  async handle(
    @Query('page', new ZodValidationPipe(pageQueryParamSchema))
    page: PageQueryParamSchema,
    @Query('query', new ZodValidationPipe(queryParamSchema))
    query: QueryParamSchema,
  ) {
    const result = await this.fetchTasksUseCase.execute({ query, page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { tasks } = result.value

    return { tasks: tasks.map((task) => TaskPresenter.toHttp(task)) }
  }
}
