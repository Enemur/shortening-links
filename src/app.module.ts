import { Module } from '@nestjs/common';
import {ShorteningLinksController} from "./controller/shortening-links.controller";
import {ShorteningLinkService} from "./service/shortening-link.service";
import {appProviders} from "./provider/shortening-link.providers";
import {ConfigService} from "./service/config.service";

@Module({
  imports: [],
  controllers: [ShorteningLinksController],
  providers: [
    ShorteningLinkService,
    ConfigService,

    ...appProviders,
  ],
})
export class AppModule {}
