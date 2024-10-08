import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";

@Module({
    controllers: [FriendsController],
    providers: [FriendsService, PrismaService],
})
export class FriendsModule {}
