import { QuestionEntity } from 'src/modules/questions/entities/question.entity';
import { UsersReportEntity } from 'src/modules/users-report/entities/users-report.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chapters' })
export class ChaptersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chapterName: string;

    @Column()
    chapterDescription: string;

    @OneToMany(
      () => QuestionEntity,
      (question) => question.chapterWith,
    )
    chapterId: QuestionEntity[];

    @OneToMany(
      () => UsersReportEntity,
      (userReport) => userReport.userReportChapterWith,
    )
    userReportChapterId: UsersReportEntity[];

    @CreateDateColumn()
    createdAt: Date;
}

