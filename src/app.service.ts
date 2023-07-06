import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) { }

  getTeams() {
    return this.prisma.team.findMany();
  }

  addTeamMoney(teamId: number, amount: number) {
    return this.updateTeam(teamId, {
      money: {
        increment: amount,
      },
    });
  }

  subTeamMoney(teamId: number, amount: number) {
    return this.updateTeam(teamId, {
      money: {
        decrement: amount,
      },
    });
  }

  setTeamMoney(teamId: number, amount: number) {
    return this.updateTeam(teamId, {
      money: amount
    });
  }

  private async updateTeam(teamId: number, data: Parameters<PrismaService['team']['update']>[0]['data']) {
    const result = await this.prisma.team.update({
      where: {
        id: teamId,
      },
      data,
    });

    this.eventEmitter.emit('team_updated', result);
  }
}
