import { Module } from "@nestjs/common";
import { ChaptersService } from "./chapters.service";
import { ChaptersResolver } from "./chapters.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChaptersEntity } from "./entities/chapters.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ChaptersEntity])],
    controllers: [],
    providers: [ChaptersService, ChaptersResolver],
})

export class ChaptersModule { }