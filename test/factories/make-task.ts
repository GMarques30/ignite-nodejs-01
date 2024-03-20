import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Task, TaskProps } from 'src/domain/enterprise/entities/task'
import { PrismaTaskMapper } from 'src/infra/database/prisma/mappers/prisma-task-mapper'
import { PrismaService } from '../../src/infra/database/prisma/prisma.service'

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityID,
) {
  const task = Task.create(
    {
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return task
}

@Injectable()
export class TaskFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaTask(data: Partial<TaskProps> = {}): Promise<Task> {
    const task = makeTask(data)

    await this.prisma.task.create({
      data: PrismaTaskMapper.toPrisma(task),
    })

    return task
  }
}
