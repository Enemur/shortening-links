import {Controller, Get, HttpStatus, Param, Put, Req, Res} from "@nestjs/common";
import {OutShorteningLinkDTO} from "../dto/out.shortening-link.dto";
import {ShorteningLinkService} from "../service/shortening-link.service";
import { ApiResponse } from '@nestjs/swagger';
import {IsUrl} from "class-validator";
import {InShorteningLinkDTO} from "../dto/in.shortening-link.dto";

@Controller()
export class ShorteningLinksController {
  constructor(
    private readonly shorteningLinkService: ShorteningLinkService,
  ) { }

  @Put(':longLink')
  @ApiResponse({ status: HttpStatus.OK, type: OutShorteningLinkDTO })
  async shortLink(
    @Param() params: InShorteningLinkDTO,
    @Req() req,
  ): Promise<OutShorteningLinkDTO> {
    const uuid = await this.shorteningLinkService.shorteningLink(params.longLink);
    return new OutShorteningLinkDTO({
      shortLink: `http://${req.headers.host}/${uuid}`
    })
  }

  @Get(':uuid')
  async redirect(
    @Res() response,
    @Param('uuid') uuid: string,
  ) {
    const longLink = await this.shorteningLinkService.getLongLink(uuid);
    response.redirect(HttpStatus.SEE_OTHER, longLink);
  }
}
