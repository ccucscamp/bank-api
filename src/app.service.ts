import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) { }

  getTeams() {
    return this.prisma.team.findMany();
  }

  addTeamMoney(teamId: number, amount: number, isFreeze: boolean) {
    return this.updateTeam(teamId, {
      money: {
        increment: amount,
      },
    }, isFreeze);
  }

  subTeamMoney(teamId: number, amount: number, isFreeze: boolean) {
    return this.updateTeam(teamId, {
      money: {
        decrement: amount,
      },
    }, isFreeze);
  }

  setTeamMoney(teamId: number, amount: number, isFreeze: boolean) {
    return this.updateTeam(teamId, {
      money: amount
    }, isFreeze);
  }

  private async updateTeam(
    teamId: number,
    data: Parameters<PrismaService['team']['update']>[0]['data'],
    isFreeze: boolean,
  ) {
    let result = await this.prisma.team.update({
      where: {
        id: teamId,
      },
      data,
    });

    if (!isFreeze) {
      result = await this.prisma.team.update({
        where: {
          id: result.id,
        },
        data: {
          beforeFreezeMoney: result.money,
        }
      });
    }

    this.eventEmitter.emit('team_updated', result);
  }
}
