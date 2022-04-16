import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import AppService from './app.service';
import { UserEventS1 } from './user.dto';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('s2_user')
  public async userForApproval(data: UserEventS1) {
    console.log(`[S2] User ${data.name} is for approval`)
    await this.appService.createUser(data);
  }

  @MessagePattern({ cmd: "s1_approved_user" })
  public async approvedUser(data: any) {
    console.log(data)
    return await this.appService.approvedUser();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
