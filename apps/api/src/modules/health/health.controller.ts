import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PrismaService } from "../../database/prisma.service";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: "Check API health" })
  check() {
    return {
      status: "ok",
      service: "iplay-api",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("database")
  @ApiOperation({ summary: "Check database connection" })
  async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: "ok",
        database: "connected",
      };
    } catch {
      return {
        status: "error",
        database: "disconnected",
      };
    }
  }
}
