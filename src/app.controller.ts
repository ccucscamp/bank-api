import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface PostBody {
  teamId: number;
  type: 'add' | 'sub' | 'set';
  amount: number;
  isFreeze: boolean;
}

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getTeams() {
    return this.appService.getTeams();
  }

  @Post()
  @HttpCode(204)
  async updateTeams(@Body() body: PostBody) {
    if (body.type === 'add') {
      await this.appService.addTeamMoney(body.teamId, body.amount, body.isFreeze);
    } else if (body.type === 'sub') {
      await this.appService.subTeamMoney(body.teamId, body.amount, body.isFreeze);
    } else if (body.type === 'set') {
      await this.appService.setTeamMoney(body.teamId, body.amount, body.isFreeze);
    } else {
      throw new Error(`unknown type ${body.type}`);
    }

    return 'team updated';
  }
}
