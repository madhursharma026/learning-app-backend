import { Question } from "./schema/question.schema";
import { QuestionService } from "./question.service";
import { AddQuestionArgs } from "./args/add.question.args";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "../auth/guards/auth.guard";

@Resolver(of => Question)
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService) { }

    @Mutation(returns => [Question], { name: 'questions' })
    findAllQuestions() {
        return this.questionService.findAllQuestions();
    }

    @Mutation(() => [Question], { name: 'findQuestionByChapterId' })
    findQuestionByChapterId(@Args('gettingChapterId', { type: () => String }) gettingChapterId: string) {
        return this.questionService.findQuestionByChapterId(gettingChapterId);
    }

    // @UseGuards(JWTAuthGuard)
    @Mutation(returns => Question, { name: 'addQuestion' })
    addQuestion(@Args('addQuestionArgs') addQuestionArgs: AddQuestionArgs) {
        return this.questionService.addQuestion(addQuestionArgs);
    }
}


