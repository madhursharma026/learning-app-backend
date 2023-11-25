import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OtpModule } from '../otp/otp.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { RoomModule } from '../room/room.module';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { RoomEntity } from '../room/entities/room.entity';
import { ChaptersModule } from '../chapters/chapters.module';
import { TeachersModule } from '../teachers/teachers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Teacher } from '../teachers/entities/teacher.entity';
import { QuestionModule } from '../questions/question.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChaptersEntity } from '../chapters/entities/chapters.entity';
import { QuestionEntity } from '../questions/entities/question.entity';
import { ConversationModule } from '../conversation/conversation.module';
import { Conversation } from '../conversation/entities/conversation.entity';
import { TeachingClassModule } from '../teaching-class/teaching-class.module';
import { TeachingClass } from '../teaching-class/entities/teaching-class.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersReportEntity } from '../users-report/entities/users-report.entity';
import { UsersReportModule } from '../users-report/users-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'en-data',
        entities: [Conversation, Teacher, TeachingClass, User, RoomEntity, QuestionEntity, ChaptersEntity, UsersReportEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    OtpModule,
    AuthModule,
    UsersModule,
    TeachersModule,
    ConversationModule,
    TeachingClassModule,
    RoomModule,
    QuestionModule,
    ChaptersModule,
    UsersReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

