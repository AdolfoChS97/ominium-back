import * as moment from 'moment';
import { SelectQueryBuilder } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export const queryParamsHandler = async (
  query: SelectQueryBuilder<any>,
  queryParams: Record<string, any> = {},
  trash: boolean = false,
): Promise<SelectQueryBuilder<any>> => {
  try {
    const alias = query.alias;
    const { pageNumber, pageSize, sort, since, until, ...rest } = queryParams;
    const page =
      pageNumber && !isNaN(+pageNumber) && +pageNumber > 0 ? +pageNumber : 1;
    const size =
      pageSize && !isNaN(+pageSize) && +pageSize > 0 ? +pageSize : 10;
    const keys = Object.keys(rest);

    if (keys.length > 0) {
      keys.forEach((key) => {
        if (rest[key]) {
          query.andWhere(`${alias}.${key} = :${key}`, { [key]: rest[key] });
        }
      });
    }

    if (moment(since, 'DD-MM-YYYY', true).isValid()) {
      const sinceDate = moment(since, 'DD-MM-YYYY')
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      query.andWhere(`${alias}.created_at >= :since`, { since: sinceDate });
    }

    if (moment(until, 'DD-MM-YYYY', true).isValid()) {
      const untilDate = moment(until, 'DD-MM-YYYY')
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      query.andWhere(`${alias}.created_at <= :until`, { until: untilDate });
    }

    if (!trash) {
      query.andWhere(`${alias}.deleted_at IS NULL`);
    } else {
      query.andWhere(`${alias}.deleted_at IS NOT NULL`);
      query.withDeleted();
    }

    const total = await query.getCount();
    if ((page - 1) * size < total) {
      query.skip((page - 1) * size).take(size);
    }

    query.orderBy(`${alias}.created_at`, sort || 'DESC');
    return query;
  } catch (e) {
    throw new InternalServerErrorException('Error handling query params', {
      cause: e,
    });
  }
};
