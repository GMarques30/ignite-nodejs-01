import { Either, left, right } from 'src/core/either'
import { Task } from '../../enterprise/entities/task'
import { TaskRepository } from './../repositories/task-repository'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteTaskInput {
  taskId: string
}

type DeleteTaskOutput = Either<
  ResourceNotFoundError,
  {
    task: Task
  }
>

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ taskId }: DeleteTaskInput): Promise<DeleteTaskOutput> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    await this.taskRepository.delete(task)

    return right({
      task,
    })
  }
}
