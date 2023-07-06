import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  getTeams() {
    return this.prisma.team.findMany();
  }

  addTeamMoney(teamId: number, amount: number) {
    return this.prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        money: {
          increment: amount,
        },
      }
    });
  }

  subTeamMoney(teamId: number, amount: number) {
    return this.prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        money: {
          decrement: amount,
        },
      }
    });
  }

  setTeamMoney(teamId: number, amount: number) {
    return this.prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        money: amount,
      }
    });
  }
}
