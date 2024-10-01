import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

export const errorHandler = (e) => {
  const {
    status,
    response: { message },
  } = e;
  switch (status) {
    case 400:
      throw new BadRequestException(message);
    case 401:
      throw new UnauthorizedException(message);
    case 403:
      throw new ForbiddenException(message);
    case 404:
      throw new NotFoundException(message);
    default:
      throw new InternalServerErrorException(message);
  }
};
