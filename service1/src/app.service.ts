import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { UserEventS1 } from './user.dto';
@Injectable()
export default class AppService {

  constructor(private prisma: PrismaService) {}

  async createUser(createUserInput: UserEventS1) {
    await this.prisma.user.create({
      data: createUserInput
    })
  }

  async approvedUser() {
    return await this.prisma.user.findMany({
      where: {
        approved: true
      }
    })
  }

  getHello() {
    return 'Hello World!';
  }

}
