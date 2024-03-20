import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from '../../database/database.module'
import { PrismaService } from '../../database/prisma/prisma.service'
import request from 'supertest'
import { TaskFactory } from 'test/factories/make-task'

describe('Import CSV Task (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [TaskFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /import', async () => {
    const response = await request(app.getHttpServer())
      .post('/import')
      .attach('file', './csv/tasks.csv')

    expect(response.statusCode).toBe(201)

    const taskOnDatabase = await prisma.task.findMany({
      where: {
        title: {
          contains: 'Task',
        },
      },
    })

    expect(taskOnDatabase).toHaveLength(5)
    expect(taskOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Task 01',
        }),
        expect.objectContaining({
          title: 'Task 02',
        }),
        expect.objectContaining({
          title: 'Task 03',
        }),
        expect.objectContaining({
          title: 'Task 04',
        }),
        expect.objectContaining({
          title: 'Task 05',
        }),
      ]),
    )
  })
})
