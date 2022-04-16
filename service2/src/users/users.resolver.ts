import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => String)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => [User])
  findAllRejected() {
    return this.usersService.findAllRejected();
  }

  @Query(() => [User])
  findAllApproved() {
    return this.usersService.findAllApproved();
  }

  @Mutation(() => String)
  async sendToApproval(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.sendToS1(id);
  }
}
