import { Chapters } from "./schema/chapters.schema";
import { ChaptersService } from "./chapters.service";
import { AddChaptersArgs } from "./args/add.chapters.args";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";

@Resolver(of => Chapters)
export class ChaptersResolver {
    constructor(private readonly chaptersService: ChaptersService) { }

    @Mutation(() => Chapters, { name: 'findChapterById' })
    findChapterById(@Args('gettingId', { type: () => String }) gettingId: string) {
        return this.chaptersService.findChapterById(gettingId);
    }

    @Query(returns => [Chapters], { name: 'chapters' })
    findAllChapters() {
        return this.chaptersService.findAllChapters();
    }

    @Mutation(returns => Chapters, { name: 'addChapters' })
    addChapters(@Args('addChaptersArgs') addChaptersArgs: AddChaptersArgs) {
        return this.chaptersService.addChapters(addChaptersArgs);
    }
}

