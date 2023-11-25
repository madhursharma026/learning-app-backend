import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Chapters {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: true})
    chapterName: string;

    @Field((type) => String, {nullable: true})
    chapterDescription: string;

    @Field((type) => String, {nullable: true})
    createdAt: string;
}

