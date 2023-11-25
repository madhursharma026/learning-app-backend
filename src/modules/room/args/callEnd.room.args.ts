import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CallEndArgs {
    @Field({ nullable: false })
    roomName: string;
}
