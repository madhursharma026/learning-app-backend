import { ChaptersEntity } from 'src/modules/chapters/entities/chapters.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'question' })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Title: string;

    @Column()
    Description: string;

    @Column()
    IsOptionInImageFormate: string;

    @Column()
    IsQuestionInImageFormate: string;

    @Column()
    IsQuestionInMCQsFormate: string;

    @Column()
    IsQuestionInInputFormate: string;

    @Column()
    IsQuestionInFillUpsFormate: string;

    @Column()
    mainHeading: string;

    @Column()
    Question: string;

    @Column()
    Option1: string;

    @Column()
    Option2: string;

    @Column()
    Option3: string;

    @Column()
    Option4: string;

    @Column()
    correctAns: string;

    @ManyToOne(() => ChaptersEntity, (chapters) => chapters.chapterId)
    @JoinColumn({ name: 'chapterId' })
    chapterWith: ChaptersEntity;
  
    @Column({ nullable: false, name: 'chapterId' })
    chapterId: number;
}
