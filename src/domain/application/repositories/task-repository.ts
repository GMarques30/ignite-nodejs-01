import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Task } from 'src/domain/enterprise/entities/task'

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>
  abstract delete(task: Task): Promise<void>
  abstract save(task: Task): Promise<void>
  abstract findMany(page: PaginationParams, query?: string): Promise<Task[]>
  abstract findById(id: string): Promise<Task | null>
}
