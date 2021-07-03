import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { GenreEntity } from '../entity/GenreEntity'

export class GenreSeed1616422228928 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(GenreEntity)

    await repository.save({ name: 'Интернет' })
    await repository.save({ name: 'Программирование' })
    await repository.save({ name: 'Базы данных' })
    await repository.save({ name: 'Роман' })
    await repository.save({ name: 'Детектив' })
    await repository.save({ name: 'Фантастика' })
    await repository.save({ name: 'История' })
    await repository.save({ name: 'Поэзия' })
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(GenreEntity)

    await repository.delete({ name: 'Интернет' })
    await repository.delete({ name: 'Программирование' })
    await repository.delete({ name: 'Базы данных' })
    await repository.delete({ name: 'Роман' })
    await repository.delete({ name: 'Детектив' })
    await repository.delete({ name: 'Фантастика' })
    await repository.delete({ name: 'История' })
    await repository.delete({ name: 'Поэзия' })
  }

}
