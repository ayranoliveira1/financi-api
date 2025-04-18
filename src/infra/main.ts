import { NestFactory } from '@nestjs/core'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { EnvService } from './env/env.service'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle(' Ducoprint api')
    .setDescription('Ducoprint API Description')
    .setVersion('1.0')
    .addTag('duco')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api', app, documentFactory)

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  await app.listen(port)
}
bootstrap()
