import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { PrismaService } from './services/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env']
		}),
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: {
				expiresIn: process.env.EXPIRES_IN,
			},
		}),
	],
	controllers: [AppController],
	providers: [PrismaService, AppService],
})
export class AppModule { }