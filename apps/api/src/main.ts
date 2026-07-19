import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { ApiExceptionFilter } from "./common/filters/api-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ApiExceptionFilter());

  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Velvet Kids API")
      .setDescription("Velvet Kids platform API documentation")
      .setVersion("0.1.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
  }

  const port = process.env.PORT || 4000;
  await app.listen(port);
  // Internal monorepo process name only — never shown on customer surfaces.
  console.log(`API listening on port ${port}`);
}

bootstrap();
