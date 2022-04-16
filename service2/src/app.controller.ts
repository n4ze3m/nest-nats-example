import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @EventPattern('s2_user_reject')
  async rejectedUser(data: string) {
    await this.appService.rejectUser(data);
  }

  @EventPattern('s2_user_approve')
  async approvedUser(data: string) {
    await this.appService.approveUser(data);
  }

  @MessagePattern({ cmd: "s2_rejected_user" })
  async rejectedUserS2(data: any) {
    return await this.appService.recjectedUsers()
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
