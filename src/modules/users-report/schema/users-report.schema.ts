import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class UsersReport {
    @Field((type) => Int)
    id: number;

    @Field((type) => Int, {nullable: true})
    userReportUserId: number;

    @Field((type) => Int, {nullable: true})
    userReportChapterId: number;

    @Field((type) => String, {nullable: true})
    doneAt: string;
}

