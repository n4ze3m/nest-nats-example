import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) { }

  async rejectUser(id: string) {
    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        rejected: true,
        isProcessing: false
      }
    })
  }

  async approveUser(id: string) {
    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        approved: true,
        isProcessing: false
      }
    })
  }

  async recjectedUsers() {
    return await this.prisma.user.findMany({
      where: {
        rejected: true
      }
    })
  }

  async getHello() {

    return 'Hello World!'
  }

}
