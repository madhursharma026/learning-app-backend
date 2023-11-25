import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class AddUsersReportArgs {
    @Field({ nullable: false })
    userReportUserId: number;

    @Field({ nullable: false })
    userReportChapterId: number;
}
