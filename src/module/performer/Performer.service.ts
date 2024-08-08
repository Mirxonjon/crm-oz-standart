import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePerformerDto } from './dto/create_performer.dto';
import { UpdatePerformerDto } from './dto/update_performer.dto';
import { ILike } from 'typeorm';
import { PerformerEntity } from 'src/entities/performer.entity';
@Injectable()
export class SendedPerformerService {
  async findAll( title :string,    pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await PerformerEntity.findAndCount({
      where : {
        title : title == 'null' ? null : ILike(`%${title}%`)
      },
      skip: offset,
      take: pageSize,
      order: {
        create_data: 'desc',
    }
  }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
    const totalPages = Math.ceil(total / pageSize);
    return {
      results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async findOne(id: string) {
    const findPerformerEntity: PerformerEntity =
      await PerformerEntity.findOne({
        where: {
          id: id,
        },
      });

    if (!findPerformerEntity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findPerformerEntity;
  }

  async create(body: CreatePerformerDto) {
    const findPerformerEntity = await PerformerEntity.findOneBy({
      title: body.title,
    });

    if (findPerformerEntity) {
      throw new HttpException(
        'Already created this category',
        HttpStatus.FOUND,
      );
    }
    await PerformerEntity.createQueryBuilder()
      .insert()
      .into(PerformerEntity)
      .values({
        title: body.title.toLowerCase(),
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdatePerformerDto) {
    const findPerformerEntity = await PerformerEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findPerformerEntity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await PerformerEntity.createQueryBuilder()
      .update(PerformerEntity)
      .set({
        title: body.title.toLowerCase() || findPerformerEntity.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findCategory = await PerformerEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Not found ', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await PerformerEntity.createQueryBuilder()
      .delete()
      .from(PerformerEntity)
      .where({ id })
      .execute();
  }
}
