import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersReportEntity } from './entities/users-report.entity';
import { AddUsersReportArgs } from './args/add.users-report.args';
import { Injectable, ConflictException } from "@nestjs/common";

@Injectable()
export class UsersReportService {
  constructor(@InjectRepository(UsersReportEntity) public readonly usersReportRepo: Repository<UsersReportEntity>) { }

  findAllUsersReport() {
    return this.usersReportRepo.find();
  }

  async findChapterById(gettingUserId: string) {
    if (!gettingUserId) throw new ConflictException('No User Id Found');
    let chaptersDetails = await this.usersReportRepo.find({ where: { userReportUserId: Number(gettingUserId) } });
    if (chaptersDetails === null) {
      throw new ConflictException('No Data Found');
    } else {
      return chaptersDetails
    }
  }

  //  async findChapterById(gettingUserId: string, gettingChapterId: string) {
  //    if (!gettingUserId) throw new ConflictException('No User Id Found');
  //    if (!gettingChapterId) throw new ConflictException('No Chapter Id Found');
  //    let chaptersDetails = await this.usersReportRepo.findOne({ where: { userReportUserId: Number(gettingUserId), userReportChapterId: Number(gettingChapterId) } });
  //    if (chaptersDetails === null) {
  //      throw new ConflictException('No Data Found');
  //    } else {
  //      return chaptersDetails
  //    }
  //  }

  async addUsersReport(addUsersReportArgs: AddUsersReportArgs): Promise<UsersReportEntity> {
    let dataFound = await this.usersReportRepo.findOne({ where: { userReportUserId: addUsersReportArgs.userReportUserId, userReportChapterId: addUsersReportArgs.userReportChapterId } });
    if (dataFound === null) {
      let newReport: UsersReportEntity = new UsersReportEntity();
      newReport.userReportUserId = addUsersReportArgs.userReportUserId;
      newReport.userReportChapterId = addUsersReportArgs.userReportChapterId;
      return await this.usersReportRepo.save(newReport);
    } else {
      let chaptersDetails = await this.usersReportRepo.findOne({ where: { userReportUserId: addUsersReportArgs.userReportUserId, userReportChapterId: addUsersReportArgs.userReportChapterId } });
      return chaptersDetails
    }
  }
}

