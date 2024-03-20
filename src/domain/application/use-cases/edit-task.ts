import { TaskRepository } from './../repositories/task-repository'
import { Task } from '../../enterprise/entities/task'
import { Either, left, right } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { RequiredFieldsError } from 'src/core/errors/errors/required-fields-error'
import { Injectable } from '@nestjs/common'

interface EditTaskInput {
  taskId: string
  title?: string
  description?: string
}

type EditTaskOutput = Either<
  ResourceNotFoundError | RequiredFieldsError,
  {
    task: Task
  }
>

@Injectable()
export class EditTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
    title,
    description,
  }: EditTaskInput): Promise<EditTaskOutput> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    if (!title && !description) {
      return left(new RequiredFieldsError())
    }

    task.title = title ?? task.title
    task.description = description ?? task.description

    await this.taskRepository.save(task)

    return right({
      task,
    })
  }
}
