import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get<PrismaService>(PrismaService)

    await app.init()
  })

  test('[POST] /auth/register', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@gmail.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
