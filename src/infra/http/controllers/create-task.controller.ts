import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateTaskUseCase } from '../../../domain/application/use-cases/create-task'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
})

type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>

@Controller('/tasks')
export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createTaskBodySchema))
    body: CreateTaskBodySchema,
  ) {
    const { title, description } = body

    const result = await this.createTaskUseCase.execute({
      title,
      description,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
