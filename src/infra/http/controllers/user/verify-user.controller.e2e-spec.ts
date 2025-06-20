import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Verify user (E2E)', () => {
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

  test('[POST] user/verify-email', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: await hash('12345678', 8),
        verificationCode: '123456',
        codeExpirationDate: new Date(Date.now() + 1000 * 60 * 10),
      },
    })

    const response = await request(app.getHttpServer())
      .post('/user/verify-email')
      .send({
        email: 'johndoe@gmail.com',
        code: '123456',
      })

    expect(response.statusCode).toBe(201)
  })
})
