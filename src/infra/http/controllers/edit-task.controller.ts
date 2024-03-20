import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { EditTaskUseCase } from '../../../domain/application/use-cases/edit-task'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const editTaskBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

type EditTaskBodySchema = z.infer<typeof editTaskBodySchema>

@Controller('/tasks/:id')
export class EditTaskController {
  constructor(private readonly editTaskUseCase: EditTaskUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') taskId: string,
    @Body(new ZodValidationPipe(editTaskBodySchema)) body: EditTaskBodySchema,
  ) {
    const { title, description } = body

    const result = await this.editTaskUseCase.execute({
      taskId,
      title,
      description,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
