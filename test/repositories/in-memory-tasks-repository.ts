import { PaginationParams } from 'src/core/repositories/pagination-params'
import { TaskRepository } from 'src/domain/application/repositories/task-repository'
import { Task } from 'src/domain/enterprise/entities/task'

export class InMemoryTasksRepository implements TaskRepository {
  public items: Task[] = []

  async create(task: Task): Promise<void> {
    this.items.push(task)
  }

  async delete(task: Task): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id)

    this.items.splice(taskIndex, 1)
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id)

    this.items[taskIndex] = task
  }

  async findMany({ page }: PaginationParams, query?: string): Promise<Task[]> {
    if (!query) {
      const tasks = this.items.slice((page - 1) * 20, page * 20)

      return tasks
    }

    const tasks = this.items
      .filter(
        (task) =>
          task.title.includes(query) || task.description.includes(query),
      )
      .slice((page - 1) * 20, page * 20)

    return tasks
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((task) => task.id.toString() === id)

    if (!task) return null

    return task
  }
}
