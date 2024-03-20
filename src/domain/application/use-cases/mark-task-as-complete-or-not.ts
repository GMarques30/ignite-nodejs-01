import { Either, left, right } from 'src/core/either'
import { Task } from '../../enterprise/entities/task'
import { TaskRepository } from '../repositories/task-repository'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface MarkTaskAsCompleteOrNotInput {
  taskId: string
}

type MarkTaskAsCompleteOrNotOutput = Either<
  ResourceNotFoundError,
  {
    task: Task
  }
>

@Injectable()
export class MarkTaskAsCompleteOrNotUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
  }: MarkTaskAsCompleteOrNotInput): Promise<MarkTaskAsCompleteOrNotOutput> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    const isTaskCompleted = !!task.completedAt
    task.completedAt = isTaskCompleted ? null : new Date()

    await this.taskRepository.save(task)

    return right({
      task,
    })
  }
}
