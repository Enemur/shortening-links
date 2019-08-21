import { IsUrl, IsNotEmpty } from 'class-validator';

export class InShorteningLinkDTO {
  @IsUrl()
  @IsNotEmpty()
  longLink: string;
}
