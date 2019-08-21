import {Controller, Get, HttpStatus, Param, Query, Req, Res} from "@nestjs/common";
import {OutShorteningLinkDTO} from "../dto/out.shortening-link.dto";
import {ShorteningLinkService} from "../service/shortening-link.service";
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ShorteningLinksController {
  constructor(
    private readonly shorteningLinkService: ShorteningLinkService,
  ) { }

  @Get('/shortening-link')
  @ApiResponse({ status: HttpStatus.OK, type: OutShorteningLinkDTO })
  async shortLink(
    @Query('long_link') longLink: string,
    @Req() req,
  ): Promise<OutShorteningLinkDTO> {
    const uuid = await this.shorteningLinkService.shorteningLink(longLink);
    return new OutShorteningLinkDTO({
      shortLink: `http://${req.headers.host}/${uuid}`
    })
  }

  @Get('/:uuid')
  async redirect(
    @Res() response,
    @Param('uuid') uuid: string,
  ) {
    const longLink = await this.shorteningLinkService.getLongLink(uuid);
    response.redirect(HttpStatus.SEE_OTHER, longLink);
  }
}
