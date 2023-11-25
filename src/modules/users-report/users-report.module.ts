import { Module } from "@nestjs/common";
import { UsersReportService } from "./users-report.service";
import { UsersReportResolver } from "./users-report.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersReportEntity } from "./entities/users-report.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsersReportEntity])],
    controllers: [],
    providers: [UsersReportService, UsersReportResolver],
})

export class UsersReportModule { }