import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { Appmodule } from "./app.module";

async function bootstrap(){
  const app = await NestFactory.create(Appmodule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();