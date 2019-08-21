import { EnumType } from 'typescript';

interface IExceptionMessagePart {
  code?: number | EnumType;
  locale?: string;
  property?: string;
  description?: string;
  module: string;
}

export type IExceptionMessage = IExceptionMessagePart[];
