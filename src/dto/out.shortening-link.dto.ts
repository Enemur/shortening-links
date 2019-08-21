import {ApiModelProperty} from "@nestjs/swagger";

export class OutShorteningLinkDTO {
  constructor(data: Required<OutShorteningLinkDTO>) {
    Object.assign(this, data);
  }

  @ApiModelProperty()
  shortLink: string;
}
