import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerMiddleware } from './common/middlewares/logs.middleware';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:['.env']
    }),
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmConfigService
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
    ManufacturerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//       consumer
//       .apply(AppLoggerMiddleware)
//       .forRoutes('*')
//       .apply(AuthMiddleware)
//       .forRoutes(
//         { path: 'article/*', method: RequestMethod.GET },
//         { path: 'user/*', method: RequestMethod.GET },
//         { path: 'user/*', method: RequestMethod.PUT },
//         { path: 'user/password', method: RequestMethod.PUT },
//         { path: 'workspace', method: RequestMethod.ALL },
//         { path: 'workspace/*', method: RequestMethod.ALL },
//         { path: 'super-admin/*', method: RequestMethod.PUT},
//         { path: 'super-admin/*', method: RequestMethod.GET},
//         { path: 'super-admin/workspaces/*', method: RequestMethod.ALL },


//       )
//   }
// }
