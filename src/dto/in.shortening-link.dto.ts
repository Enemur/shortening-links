import { IsUrl, IsNotEmpty } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class InShorteningLinkDTO {
  @IsUrl()
  @IsNotEmpty()
  @ApiModelProperty()
  longLink: string;
}
