import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { PrismaService } from './services/prisma.service';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.EXPIRES_IN,
			},
		}),
		ManufacturerModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [PrismaService, AppService],
})
export class AppModule { }
