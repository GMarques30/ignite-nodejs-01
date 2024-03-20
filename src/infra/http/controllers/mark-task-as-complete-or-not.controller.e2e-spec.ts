import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../app.module'
import { DatabaseModule } from '../../database/database.module'
import { PrismaService } from '../../database/prisma/prisma.service'
import request from 'supertest'
import { TaskFactory } from '../../../../test/factories/make-task'

describe('Mark Task As Complete Or Not (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let taskFactory: TaskFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [TaskFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    taskFactory = moduleRef.get(TaskFactory)

    await app.init()
  })

  test('[PATCH] /tasks/:id/complete', async () => {
    const task = await taskFactory.makePrismaTask({
      title: 'Task 01',
    })

    const taskId = task.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}/complete`)
      .send()

    expect(response.statusCode).toBe(200)

    const taskOnDatabase = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    expect(taskOnDatabase).toEqual(
      expect.objectContaining({
        title: 'Task 01',
        completedAt: expect.any(Date),
      }),
    )
  })
})
