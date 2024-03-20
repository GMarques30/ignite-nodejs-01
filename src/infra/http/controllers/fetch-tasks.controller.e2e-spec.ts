import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from '../../database/database.module'
import request from 'supertest'
import { TaskFactory } from 'test/factories/make-task'

describe('Fetch Task (E2E)', () => {
  let app: INestApplication
  let taskFactory: TaskFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [TaskFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    taskFactory = moduleRef.get(TaskFactory)

    await app.init()
  })

  test('[GET] /tasks', async () => {
    await Promise.all([
      taskFactory.makePrismaTask({
        title: 'Task 01',
      }),
      taskFactory.makePrismaTask({
        title: 'Task 02',
      }),
      taskFactory.makePrismaTask({
        description: 'Description 03',
      }),
    ])

    const response = await request(app.getHttpServer()).get('/tasks').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      tasks: expect.arrayContaining([
        expect.objectContaining({
          title: 'Task 01',
        }),
        expect.objectContaining({
          title: 'Task 02',
        }),
        expect.objectContaining({
          description: 'Description 03',
        }),
      ]),
    })
  })
})
