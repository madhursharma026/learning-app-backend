import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { AddChaptersArgs } from './args/add.chapters.args';
import { ChaptersEntity } from './entities/chapters.entity';
import { Injectable, ConflictException } from "@nestjs/common";

@Injectable()
export class ChaptersService {
  constructor(@InjectRepository(ChaptersEntity) public readonly chapterRepo: Repository<ChaptersEntity>) { }

  async findChapterById(gettingId: string) {
    if (!gettingId) throw new ConflictException('No Id Found');
    let chaptersDetails = await this.chapterRepo.findOne({ where: { id: Number(gettingId) } });
    if (chaptersDetails === null) {
      throw new ConflictException('No Chapter Found');
    } else {
      return chaptersDetails
    }
  }

  findAllChapters() {
    return this.chapterRepo.find();
  }

  async addChapters(addchaptersArgs: AddChaptersArgs): Promise<ChaptersEntity> {
    let chapterFound = await this.chapterRepo.findOne({ where: { chapterName: addchaptersArgs.chapterName } });
    if (chapterFound === null) {
      let chapter: ChaptersEntity = new ChaptersEntity();
      chapter.chapterName = addchaptersArgs.chapterName;
      return await this.chapterRepo.save(chapter);
    } else {
      throw new ConflictException('Chapter Already Exists');
    }
  }
}
