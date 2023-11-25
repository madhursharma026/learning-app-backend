import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionEntity } from './entities/question.entity';
import { AddQuestionArgs } from './args/add.question.args';
import { Injectable, ConflictException } from "@nestjs/common";

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionEntity) public readonly quesRepo: Repository<QuestionEntity>) { }

  findAllQuestions() {
    return this.quesRepo.find();
  }

  async findQuestionByChapterId(gettingChapterId: string) {
    if (!gettingChapterId) throw new ConflictException('No User Id Found');
    let questionDetails = await this.quesRepo.find({ where: { chapterId: Number(gettingChapterId) } });
    if (questionDetails === null) {
      throw new ConflictException('No Data Found');
    } else {
      return questionDetails
    }
  }


  async addQuestion(addQuestionArgs: AddQuestionArgs): Promise<QuestionEntity> {
    let questionFound = await this.quesRepo.findOne({ where: { Question: addQuestionArgs.Question } });
    if (questionFound === null) {
      let question: QuestionEntity = new QuestionEntity();
      question.mainHeading = addQuestionArgs.mainHeading;
      question.Title = addQuestionArgs.Title;
      question.Description = addQuestionArgs.Description;
      question.Question = addQuestionArgs.Question;
      question.Option1 = addQuestionArgs.Option1;
      question.Option2 = addQuestionArgs.Option2;
      question.Option3 = addQuestionArgs.Option3;
      question.Option4 = addQuestionArgs.Option4;
      question.correctAns = addQuestionArgs.correctAns;
      question.IsOptionInImageFormate = addQuestionArgs.IsOptionInImageFormate;
      question.IsQuestionInMCQsFormate = addQuestionArgs.IsQuestionInMCQsFormate;
      question.IsQuestionInInputFormate = addQuestionArgs.IsQuestionInInputFormate;
      question.IsQuestionInImageFormate = addQuestionArgs.IsQuestionInImageFormate;
      question.IsQuestionInFillUpsFormate = addQuestionArgs.IsQuestionInFillUpsFormate;
      question.chapterId = addQuestionArgs.chapterId;
      return await this.quesRepo.save(question);
    } else {
      throw new ConflictException('Question Already Exists');
    }
  }
}
