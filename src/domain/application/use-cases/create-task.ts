import { Either, right } from 'src/core/either'
import { Task } from 'src/domain/enterprise/entities/task'
import { TaskRepository } from '../repositories/task-repository'
import { Injectable } from '@nestjs/common'

interface CreateTaskInput {
  title: string
  description: string
}

type CreateTaskOutput = Either<
  null,
  {
    task: Task
  }
>

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    title,
    description,
  }: CreateTaskInput): Promise<CreateTaskOutput> {
    const task = Task.create({
      title,
      description,
    })

    await this.taskRepository.create(task)

    return right({
      task,
    })
  }
}
