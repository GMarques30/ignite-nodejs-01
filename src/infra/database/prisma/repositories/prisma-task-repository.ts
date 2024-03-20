import { Injectable } from '@nestjs/common'
import { PaginationParams } from '../../../../core/repositories/pagination-params'
import { TaskRepository } from '../../../../domain/application/repositories/task-repository'
import { Task } from '../../../../domain/enterprise/entities/task'
import { PrismaTaskMapper } from '../mappers/prisma-task-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await this.prisma.task.create({
      data,
    })
  }

  async delete(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await this.prisma.task.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(task: Task): Promise<void> {
    const data = PrismaTaskMapper.toPrisma(task)

    await this.prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findMany({ page }: PaginationParams, query?: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return tasks.map((task) => PrismaTaskMapper.toDomain(task))
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!task) return null

    return PrismaTaskMapper.toDomain(task)
  }
}
