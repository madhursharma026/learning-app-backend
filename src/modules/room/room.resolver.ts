import { Room } from "./schema/room.schema";
import { RoomService } from "./room.service";
import { JoinRoomArgs } from "./args/join.room.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CallEndArgs } from "./args/callEnd.room.args";

@Resolver(of => Room)
export class RoomResolver {
    constructor(private readonly roomService: RoomService) { }

    @Query(() => Room, { name: 'roomConnectingToOther' })
    findOne(@Args('myToken', { type: () => String }) myToken: string) {
        return this.roomService.findOneById(myToken);
    }


    @Mutation(returns => Room, { name: 'joinRoom' })
    joinRoom(@Args('joinRoomArgs') joinRoomArgs: JoinRoomArgs) {
        return this.roomService.joinRoom(joinRoomArgs);
    }


    @Mutation(returns => Room, { name: 'callEnd' })
    callEnd(@Args('callEndArgs') callEndArgs: CallEndArgs) {
        return this.roomService.callEnd(callEndArgs);
    }


    @Mutation(returns => [Room], { name: 'showMyAllCallsInLast24HrsIncomming' })
    showMyAllCallsInLast24HrsIncomming(@Args('joinRoomArgs') joinRoomArgs: JoinRoomArgs) {
        return this.roomService.showMyAllCallsInLast24HrsIncomming(joinRoomArgs);
    }


    @Mutation(returns => [Room], { name: 'showMyAllCallsInLast24HrsOutGoing' })
    showMyAllCallsInLast24HrsOutGoing(@Args('joinRoomArgs') joinRoomArgs: JoinRoomArgs) {
        return this.roomService.showMyAllCallsInLast24HrsOutGoing(joinRoomArgs);
    }


    @Mutation(returns => Room, { name: 'connectingRoom' })
    connectingRoom(@Args('joinRoomArgs') joinRoomArgs: JoinRoomArgs) {
        return this.roomService.connectingRoom(joinRoomArgs);
    }
}

