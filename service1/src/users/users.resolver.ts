import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }


  @Query(() => [User])
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => [User])
  findAllRejected() {
    return this.usersService.findAllRejected();
  }

  @Mutation(() => String)
  async rejectUser(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.rejectUser(id);
  }

  @Mutation(() => String)
  async approveUser(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.approveUser(id);
  }

}
