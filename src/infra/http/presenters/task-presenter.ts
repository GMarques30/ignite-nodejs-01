import { Task } from 'src/domain/enterprise/entities/task'

export class TaskPresenter {
  static toHttp(task: Task) {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }
}
