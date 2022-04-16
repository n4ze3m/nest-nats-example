import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,
    @Inject('S2_SERVICE') private readonly s2Service: ClientProxy,
  ) {
    this.s2Service.connect()
  }


  async findAll() {
    return await this.prisma.user.findMany()
  }


  async findAllRejected() {
    const users = await this.s2Service.send({ cmd: "s2_rejected_user" }, {}).toPromise();
    return users
  }


  async rejectUser(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      return "User not found"
    }


    if (user.approved) {
      return "User is already approved"
    }

    if (user.rejected) {
      return "User is already rejected"
    }

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        rejected: true
      }
    })

    this.s2Service.emit('s2_user_reject', id)

    return "User rejected successfully"
  }


  async approveUser(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      return "User not found"
    }

    if (user.approved) {
      return "User is already approved"
    }

    if (user.rejected) {
      return "User is already rejected"
    }

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        approved: true
      }
    })

    this.s2Service.emit('s2_user_approve', id)
    return "User approved successfully"
  }

} 
