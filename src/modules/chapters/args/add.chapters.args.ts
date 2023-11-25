import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class AddChaptersArgs {
    @Field({ nullable: false })
    chapterName: string;

    @Field({ nullable: false })
    chapterDescription: string;
}
