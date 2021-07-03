import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { PublisherEntity } from '../entity/PublisherEntity'

export class PublisherSeed1616422027511 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(PublisherEntity)

    await repository.save({ name: 'O\'Reilly' })
    await repository.save({ name: 'Питер' })
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(PublisherEntity)

    await repository.delete({ name: 'O\'Reilly' })
    await repository.delete({ name: 'Питер' })
  }

}
