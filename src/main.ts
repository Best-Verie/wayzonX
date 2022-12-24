import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './services/prisma.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('WastezonX')
		.setDescription('WastezonX API')
		.setVersion('1.0')
		.addTag('Manufacturer')
		.build();

	const prismaService = app.get(PrismaService);

	await prismaService.enableShutdownHooks(app)


	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
