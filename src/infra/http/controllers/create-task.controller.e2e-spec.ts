import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from '../../database/database.module'
import { PrismaService } from '../../database/prisma/prisma.service'

describe('Create Task (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /tasks', async () => {
    const response = await request(app.getHttpServer()).post('/tasks').send({
      title: 'New task',
      description: 'New description',
    })

    expect(response.statusCode).toBe(201)

    const taskOnDatabase = await prisma.task.findFirst({
      where: {
        title: 'New task',
      },
    })

    expect(taskOnDatabase).toBeTruthy()
  })
})
