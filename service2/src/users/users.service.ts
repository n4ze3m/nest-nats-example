import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { S1UserEvent } from './dto/user.event';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,
    @Inject('S1_SERVICE') private readonly s1Service: ClientProxy,
  ) {
    this.s1Service.connect()
  }

  async create(createUserInput: CreateUserInput) {
    await this.prisma.user.create({
      data: {
        ...createUserInput,
      }
    })
    return 'User created successfully'
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findAllRejected() {
    return await this.prisma.user.findMany({
      where: {
        rejected: true
      }
    })
  }

  async findAllApproved() {
    const users = await this.s1Service.send({ cmd: "s1_approved_user" }, {}).toPromise();
    return users
  }

  async sendToS1(id: string) {

    const user = await this.prisma.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      return "User not found"
    }

    if (user.isProcessing) {
      return "User is already processing"
    }

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        isProcessing: true
      }
    })


    this.s1Service.emit("s2_user", new S1UserEvent(user.id, user.name, user.email))

    return "User sent to S1 for approval"
  }
}
