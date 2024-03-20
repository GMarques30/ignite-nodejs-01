import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteTaskUseCase } from '../../../domain/application/use-cases/delete-task'

@Controller('/tasks/:id')
export class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: DeleteTaskUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') taskId: string) {
    const result = await this.deleteTaskUseCase.execute({
      taskId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
