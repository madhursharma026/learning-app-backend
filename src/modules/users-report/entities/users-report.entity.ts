import { ChaptersEntity } from 'src/modules/chapters/entities/chapters.entity';
import { QuestionEntity } from 'src/modules/questions/entities/question.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users-report' })
export class UsersReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ChaptersEntity, (chapters) => chapters.userReportChapterId)
    @JoinColumn({ name: 'userReportChapterId' })
    userReportChapterWith: ChaptersEntity;
  
    @Column({ nullable: false, name: 'userReportChapterId' })
    userReportChapterId: number;

    @ManyToOne(() => User, (users) => users.userReportUserId)
    @JoinColumn({ name: 'userReportUserId' })
    userReportUserWith: User;
  
    @Column({ nullable: false, name: 'userReportUserId' })
    userReportUserId: number;

    @CreateDateColumn()
    doneAt: Date;
}

