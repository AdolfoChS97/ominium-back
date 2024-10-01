import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

export const errorHandler = (e) => {
  const { status, response } = e;
  switch (status) {
    case 400:
      throw new BadRequestException(response?.message || e?.stack);
    case 401:
      throw new UnauthorizedException(response?.message || e?.stack);
    case 403:
      throw new ForbiddenException(response?.message || e?.stack);
    case 404:
      throw new NotFoundException(response?.message || e?.stack);
    default:
      throw new InternalServerErrorException(response?.message || e?.stack);
  }
};
