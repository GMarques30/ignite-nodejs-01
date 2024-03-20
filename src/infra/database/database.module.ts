import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TaskRepository } from '../../domain/application/repositories/task-repository'
import { PrismaTaskRepository } from './prisma/repositories/prisma-task-repository'

@Module({
  providers: [
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
  ],
  exports: [PrismaService, TaskRepository],
})
export class DatabaseModule {}
