import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global Validation Pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Global Exception Filter
    app.useGlobalFilters(new HttpExceptionFilter());

    // Global Response Interceptor
    app.useGlobalInterceptors(new ResponseInterceptor());

    // Enable CORS
    app.enableCors();

    // Swagger Configuration
    const config = new DocumentBuilder()
        .setTitle('Inventory & Catalog Service')
        .setDescription('The Inventory & Catalog Service API description')
        .setVersion('1.0')
        .addTag('inventory')
        .addTag('catalog')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger Docs available at: ${await app.getUrl()}/api`);
}
bootstrap();
