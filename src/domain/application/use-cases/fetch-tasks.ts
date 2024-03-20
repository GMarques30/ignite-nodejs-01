import { TaskRepository } from './../repositories/task-repository'
import { Task } from '../../enterprise/entities/task'
import { Either, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'

interface FetchTaskInput {
  query?: string
  page: number
}

type FetchTaskOutput = Either<
  null,
  {
    tasks: Task[]
  }
>

@Injectable()
export class FetchTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ query, page }: FetchTaskInput): Promise<FetchTaskOutput> {
    const tasks = await this.taskRepository.findMany({ page }, query)

    return right({
      tasks,
    })
  }
}
