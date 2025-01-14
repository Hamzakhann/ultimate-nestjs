
import { NestFactory } from '@nestjs/core';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { SeedService } from "./seed/seed.service";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const seedService = app.get(SeedService);
  // await seedService.seed();
  //Configure the swagger module here
  const config = new DocumentBuilder() //1
    .setTitle("Spotify Clone")
    .setDescription("The Spotify Clone Api documentation")
    .setVersion("1.0")
    .addBearerAuth(
      // Enable Bearer Auth here
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup("api", app, document); //3

  const configService = app.get(ConfigService); // get the instance of
  await app.listen(configService.get<number>("port"));
}
bootstrap();
