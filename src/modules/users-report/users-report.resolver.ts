import { UsersReport } from "./schema/users-report.schema";
import { UsersReportService } from "./users-report.service";
import { AddUsersReportArgs } from "./args/add.users-report.args";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";

@Resolver(of => UsersReport)
export class UsersReportResolver {
    constructor(private readonly usersReportService: UsersReportService) { }

    @Query(returns => [UsersReport], { name: 'usersReport' })
    findAllUsersReport() {
        return this.usersReportService.findAllUsersReport();
    }

    @Mutation(() => [UsersReport], { name: 'findUserReportByIds' })
    findChapterById(@Args('gettingUserId', { type: () => String }) gettingUserId: string) {
        return this.usersReportService.findChapterById(gettingUserId);
    }

    // @Mutation(() => UsersReport, { name: 'findUserReportByIds' })
    // findChapterById(@Args('gettingUserId', { type: () => String }) gettingUserId: string,
    //     @Args('gettingChapterId', { type: () => String }) gettingChapterId: string) {
    //     return this.usersReportService.findChapterById(gettingUserId, gettingChapterId);
    // }

    @Mutation(returns => UsersReport, { name: 'addUsersReport' })
    addUsersReport(@Args('addUsersReportArgs') addUsersReportArgs: AddUsersReportArgs) {
        return this.usersReportService.addUsersReport(addUsersReportArgs);
    }
}

