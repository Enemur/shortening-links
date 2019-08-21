import {BadRequestException} from "@nestjs/common";
import {IExceptionMessage} from "../core/exception/exception.message";
import {ExceptionCodesEnum} from "./exception.codes.enum";
import {AppModule} from "../app.module";

export class UnknownShortLinkException extends BadRequestException {
  constructor() {
    super([
      {
        code: ExceptionCodesEnum.UnknowShortLink,
        description: "Unknown short link",
        module: AppModule.name,
      }
    ] as IExceptionMessage)
  }
}
