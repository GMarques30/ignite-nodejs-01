import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from '../../database/database.module'
import { PrismaService } from '../../database/prisma/prisma.service'
import request from 'supertest'
import { TaskFactory } from 'test/factories/make-task'

describe('Edit Task (E2E)', () => {
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

  test('[PUT] /tasks/:id', async () => {
    const task = await taskFactory.makePrismaTask()

    const taskId = task.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/tasks/${taskId}`)
      .send({
        title: 'Edit title',
        description: 'Edit description',
      })

    expect(response.statusCode).toBe(204)

    const taskOnDatabase = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    expect(taskOnDatabase).toEqual(
      expect.objectContaining({
        title: 'Edit title',
        description: 'Edit description',
      }),
    )
  })
})
