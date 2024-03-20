import { Task as PrismaTask, Prisma } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Task } from 'src/domain/enterprise/entities/task'

export class PrismaTaskMapper {
  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }

  static toDomain(raw: PrismaTask): Task {
    return Task.create(
      {
        title: raw.title,
        description: raw.description,
        completedAt: raw.completedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
