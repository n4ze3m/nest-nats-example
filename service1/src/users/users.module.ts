import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  imports: [
    ClientsModule.register([
      {
        name: 'S2_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          queue: 's2_queue',
        }
      },
    ]),
  ]
})
export class UsersModule {}
