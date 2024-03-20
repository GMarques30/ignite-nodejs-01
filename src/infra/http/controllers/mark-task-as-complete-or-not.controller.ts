import { BadRequestException, Controller, Param, Patch } from '@nestjs/common'
import { MarkTaskAsCompleteOrNotUseCase } from '../../../domain/application/use-cases/mark-task-as-complete-or-not'

@Controller('/tasks/:id/complete')
export class MarkTaskAsCompleteOrNotController {
  constructor(
    private readonly markTaskAsCompleteOrNotUseCase: MarkTaskAsCompleteOrNotUseCase,
  ) {}

  @Patch()
  async handle(@Param('id') taskId: string) {
    const result = await this.markTaskAsCompleteOrNotUseCase.execute({
      taskId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
