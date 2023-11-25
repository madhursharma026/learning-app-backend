import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { RoomEntity } from './entities/room.entity';
import { JoinRoomArgs } from './args/join.room.args';
import { Injectable, ConflictException } from "@nestjs/common";
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import { CallEndArgs } from './args/callEnd.room.args';

const SERVER_URL = 'wss://audio-chat-nextjs-eqg35w5o.livekit.cloud';
const client = new RoomServiceClient(SERVER_URL, 'APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB');

@Injectable()
export class RoomService {
  constructor(@InjectRepository(RoomEntity) public readonly roomRepo: Repository<RoomEntity>) { }

  async findOneById(myToken: string) {
    if (!myToken) throw new ConflictException('No Token Found');
    let checkingInFirstUserToken = await this.roomRepo.findOne({ where: { firstParticipantToken: myToken } });
    if (checkingInFirstUserToken === null) {
      let checkingInSecondUserToken = await this.roomRepo.findOne({ where: { secondParticipantToken: myToken } });
      if (checkingInSecondUserToken === null) {
        throw new ConflictException('No Room Found');
      } else {
        return checkingInSecondUserToken
      }
    } else {
      return checkingInFirstUserToken
    }
  }


  async joinRoom(joinRoomArgs: JoinRoomArgs): Promise<RoomEntity> {
    let roomFound = await this.roomRepo.findOne({ where: { secondParticipantToken: null, participants: 1 } });
    if (roomFound === null) {
      let room: RoomEntity = new RoomEntity();
      let roomName = `room-${Math.random().toFixed(2)}`
      client.createRoom({ name: roomName, emptyTimeout: 0.1 * 60, maxParticipants: 2 })
      const at = new AccessToken('APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB', { identity: joinRoomArgs.username, });
      at.addGrant({ roomJoin: true, room: roomName });
      room.roomName = roomName;
      room.participants = 1;
      room.firstParticipantToken = at.toJwt();
      room.secondParticipantToken = null
      room.firstParticipantMobileNumber = joinRoomArgs.username;
      room.secondParticipantMobileNumber = null;
      let todayDate = new Date();
      var todayDateTime = ((todayDate.getFullYear()) + "-" + (("0" + (todayDate.getMonth() + 1)).slice(-2)) + "-" + (("0" + todayDate.getDate()).slice(-2)) + " " + (todayDate.getHours()) + ":" + (todayDate.getMinutes()) + ":" + (todayDate.getSeconds()));
      room.createdAt = todayDateTime;
      return await this.roomRepo.save(room);
    } else {
      let todayDate = new Date();
      var todayDateTime = ((todayDate.getFullYear()) + "-" + (("0" + (todayDate.getMonth() + 1)).slice(-2)) + "-" + (("0" + todayDate.getDate()).slice(-2)) + " " + (todayDate.getHours()) + ":" + (todayDate.getMinutes() + 1) + ":" + (todayDate.getSeconds()));
      var fiveMinutesAgo = ((todayDate.getFullYear()) + "-" + (("0" + (todayDate.getMonth() + 1)).slice(-2)) + "-" + (("0" + todayDate.getDate()).slice(-2)) + " " + (todayDate.getHours()) + ":" + (todayDate.getMinutes() - 5) + ":" + (todayDate.getSeconds()));
      if (roomFound.createdAt >= fiveMinutesAgo && roomFound.createdAt <= todayDateTime) {
        const at = new AccessToken('APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB', { identity: joinRoomArgs.username, });
        roomFound.participants = 2;
        at.addGrant({ roomJoin: true, room: joinRoomArgs.username });
        roomFound.secondParticipantToken = at.toJwt();
        roomFound.secondParticipantMobileNumber = joinRoomArgs.username;
        return await this.roomRepo.save(roomFound);
      } else {
        let room: RoomEntity = new RoomEntity();
        let roomName = `room-${Math.random().toFixed(2)}`
        client.createRoom({ name: roomName, emptyTimeout: 0.1 * 60, maxParticipants: 2 })
        const at = new AccessToken('APIRiqLzR74T8nr', 'JkBo1o58XmqpkvSZo3Juko08lybfJYyZk2bieQ9NceaB', { identity: joinRoomArgs.username, });
        at.addGrant({ roomJoin: true, room: roomName });
        room.roomName = roomName;
        room.participants = 1;
        room.firstParticipantToken = at.toJwt();
        room.secondParticipantToken = null
        room.firstParticipantMobileNumber = joinRoomArgs.username;
        room.secondParticipantMobileNumber = null;
        let todayDate = new Date();
        var todayDateTime = ((todayDate.getFullYear()) + "-" + (("0" + (todayDate.getMonth() + 1)).slice(-2)) + "-" + (("0" + todayDate.getDate()).slice(-2)) + " " + (todayDate.getHours()) + ":" + (todayDate.getMinutes()) + ":" + (todayDate.getSeconds()));
        room.createdAt = todayDateTime;
        return await this.roomRepo.save(room);
      }
    }
  }


  async callEnd(callEndArgs: CallEndArgs) {
    if (!callEndArgs) throw new ConflictException('No Room Found');
    let checkingRoom = await this.roomRepo.findOne({ where: { roomName: callEndArgs.roomName } });
    if (checkingRoom === null) {
      throw new ConflictException('No Room Found');
    } else {
      let todayDate = new Date();
      var todayDateTime = ((todayDate.getFullYear()) + "-" + (("0" + (todayDate.getMonth() + 1)).slice(-2)) + "-" + (("0" + todayDate.getDate()).slice(-2)) + " " + (todayDate.getHours()) + ":" + (todayDate.getMinutes()) + ":" + (todayDate.getSeconds()));
      checkingRoom.endedAt = todayDateTime;
      return await this.roomRepo.save(checkingRoom);
    }
  }


  async showMyAllCallsInLast24HrsIncomming(joinRoomArgs: JoinRoomArgs) {
    if (!joinRoomArgs) throw new ConflictException('No Username Found');
    let checkingInFirstUser = await this.roomRepo.find({ where: { firstParticipantMobileNumber: joinRoomArgs.username } });
    if (checkingInFirstUser.length === 0) {
      throw new ConflictException('No Data Found');
    } else {
      return checkingInFirstUser
    }
  }


  async showMyAllCallsInLast24HrsOutGoing(joinRoomArgs: JoinRoomArgs) {
    if (!joinRoomArgs) throw new ConflictException('No Username Found');
    let checkingInSecondUser = await this.roomRepo.find({ where: { secondParticipantMobileNumber: joinRoomArgs.username } });
    if (checkingInSecondUser.length === 0) {
      throw new ConflictException('No Data Found');
    } else {
      return checkingInSecondUser
    }
  }


  async connectingRoom(joinRoomArgs: JoinRoomArgs) {
    if (!joinRoomArgs) throw new ConflictException('No Room Found');
    let checkingInFirstUserToken = await this.roomRepo.findOne({ where: { firstParticipantToken: joinRoomArgs.username } });
    if (checkingInFirstUserToken === null) {
      throw new ConflictException('No Room Found');
    } else {
      return checkingInFirstUserToken
    }
  }
}
